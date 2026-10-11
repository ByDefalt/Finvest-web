# AGENTS.md — Finvest-web

> Guide destiné aux assistants IA (Claude, Copilot, Cursor…) qui travaillent sur ce dépôt.
> Lis ce fichier en entier avant de modifier du code. Si une demande entre en conflit avec ces règles, signale-le au lieu de contourner la règle.
> Les fichiers cités comme **références** sont conformes ; la section « Dette connue » liste ce qui ne l'est pas : **ne jamais copier ces patterns**.

## 1. Le projet

**Finvest** est une application de **suivi de gestion de patrimoine avec statistiques**.

- Les comptes affichés reflètent des **comptes bancaires réels**, déjà validés côté banque. Le front ne gère pas leur cycle de vie : le domaine est descriptif, avec peu de règles métier de garde-fou.
- Ce dépôt est le **front web (Vue 3)**. Un front mobile Android est prévu : **les calculs et statistiques vivent côté backend**, jamais dans le front.
- Backend : `ByDefalt/Finvest-back` (Spring Boot, Kotlin, MariaDB), API documentée via OpenAPI (`{VITE_API_URL}/v3/api-docs`).
- Fonctionnalités actuelles : inscription, connexion (access token + refresh), dashboard des comptes, formulaire de création de compte (en cours, pas encore branché à l'API).

## 2. Stack

| Domaine | Choix |
|---|---|
| Framework / build | Vue 3.5, Vite |
| Langage | **TypeScript partout** (`strict`, `noUncheckedIndexedAccess`) |
| Injection de dépendances | **awilix** (`InjectionMode.CLASSIC`, `strict: true`) |
| Routing | vue-router |
| HTTP | axios, via le mutator orval `customInstance` (`src/api/httpClient.ts`) |
| Client API | **orval** (généré depuis l'OpenAPI du backend) |
| i18n | vue-i18n, locale unique `fr` (`src/i18n/locales/fr.json`) |
| Style | Design System maison (`Ds*`) + Tailwind 4 **confiné au DS** |
| Qualité | vue-tsc, ESLint (typescript-eslint, eslint-plugin-vue), Prettier |
| Tests (installés) | vitest, @vue/test-utils, msw, Playwright |

Présents dans `package.json` mais **pas encore utilisés dans `src/`** : pinia, pinia-plugin-persistedstate, @tanstack/vue-query, zod, chart.js, superagent. Ne pas les introduire dans une feature sans demande explicite ; ne pas utiliser `superagent`.

## 3. Structure du dépôt

```
src/
├── api/                  # httpClient.ts (axios + refresh token), appError.ts (AppError / toAppError)
├── auth/                 # accessToken.ts (token en mémoire), di.ts
├── common/               # composants transverses hors DS (à éviter, voir dette)
├── design-system/
│   ├── components/       # Ds*.vue, field-context.ts, useToast.ts
│   └── style/            # tokens.css, tailwind.css, ds.css, main.css
├── di/di.ts              # container awilix, resolve<T>(name), ProjectDi()
├── i18n/                 # index.ts, useErrorMessage.ts, locales/fr.json
├── modules/
│   ├── di/ModuleDi.ts    # enregistre tous les modules
│   ├── auth/ | dashboard/ | account/
│   │   ├── domain/            # models/ + repositories/ (interfaces)
│   │   ├── application/       # use-cases/
│   │   ├── infrastructure/    # generated/ (orval), mappers/, repositories/ (XxxApiRepository)
│   │   ├── presentation/      # views/, components/, composables/ (XxxViewModel.ts)
│   │   └── di/                # XxxModule.ts (enregistrement awilix)
├── router/index.ts
└── main.ts
```

Chaque feature = un **module** dans `src/modules/<nom>/` avec ces mêmes sous-dossiers. Alias d'import : `@/` → `src/`.

## 4. Architecture

Clean Architecture + MVVM. Les dépendances vont dans **un seul sens** :

```
View → ViewModel → UseCase → Repository (interface, domain) ← XxxApiRepository (infrastructure) → API générée
```

| Couche | Rôle | Interdits |
|---|---|---|
| **domain** | Modèles (`interface`) et interfaces de repositories. TypeScript pur. | Import de Vue, axios, DTO générés |
| **application** | `XxxUseCase` : classe avec un `execute(...)`, un use case = une intention. Dépend des **interfaces** de repository. | Import de Vue, du DOM, de l'infrastructure |
| **infrastructure** | `XxxApiRepository implements XxxRepository`, mappers DTO ↔ domain, code orval. | Logique d'affichage, `localStorage`, accès au router |
| **ViewModel** | Classe `XxxViewModel` avec `readonly state = reactive({...})` et des méthodes d'action, injectée via awilix. | Markup, styles, texte en dur |
| **View** | `.vue` : affichage uniquement, `<script setup lang="ts">`. | Appel API, logique métier, CSS |

Règles :

- Le **domain** ne dépend de rien. Les **DTO orval ne sortent jamais de `infrastructure/`** : le repository les convertit via un mapper (`mapXxxResponseToXxx`) avant de renvoyer un modèle du domain.
- La View récupère son ViewModel avec `resolve<XxxViewModel>("xxxViewModel")` (`@/di/di.ts`) et ne parle qu'à lui.
- Nommage : `XxxUseCase`, `XxxViewModel`, `XxxRepository` (interface), `XxxApiRepository` (implémentation), mappers dans `infrastructure/mappers/`.
- Imports : `import type` pour les types ; alias `@/`.

### 4.1 Injection de dépendances (awilix, mode CLASSIC)

En mode `CLASSIC`, awilix résout les dépendances **par le nom des paramètres du constructeur**. Donc :

- Le nom du paramètre de constructeur doit être **identique** au nom d'enregistrement (`authRepository`, `loginUseCase`, `getDashboardUseCase`…), en camelCase.
- Cycles de vie : repositories et use cases en `.singleton()`, ViewModels en `.scoped()`.
- Chaque module expose `XxxModule()` qui appelle `container.register({...})` ; ce `XxxModule()` doit être ajouté dans `src/modules/di/ModuleDi.ts`.
- Les noms enregistrés sont **sensibles à la casse** (`accessToken`, pas `AccessToken`).

## 5. Règles à respecter (non négociables)

### 5.1 Design System dans les views

- **Les Views n'utilisent que des composants du DS (`Ds*`)** : `DsCenteredPage`, `DsCard`, `DsStack`, `DsForm`, `DsHeader`, `DsField`, `DsInput`, `DsSelect`, `DsText`, `DsLink`, `DsPrimaryButton`, `DsErrorMessage`, `DsToast`/`DsToastContainer` (+ `useToast`). Pas de `<div>`, `<p>`, `<button>`, `<h1>`… « libres » à la place d'un composant DS.
- **Aucun CSS dans les Views** : ni `<style>`, ni `style="..."`, ni classe Tailwind utilitaire (`flex`, `p-4`, `text-muted-foreground`…), ni classe CSS ad hoc, ni `:class` qui porte du style.
- Pas de librairie UI tierce.
- Si un besoin visuel n'est pas couvert : **ne pas bricoler dans la View**. Créer ou étendre un composant dans `src/design-system/components/`, avec ses variantes en **props typées**, puis l'utiliser.
- **Pattern d'un composant DS** (voir `DsStack.vue`, `DsText.vue`) : props typées avec union de littéraux (`gap?: 'sm' | 'md' | 'lg'`) → classes sémantiques BEM `ds-<composant>--<variante>` → ces classes sont définies dans `ds.css`.
- **Séparation des fichiers de style** :
    - `tokens.css` : variables CSS natives (couleurs, rayon, ombres, polices, espacement), modes clair et `.dark`. Aucune valeur de couleur/espacement en dur ailleurs.
    - `tailwind.css` : tout ce qui est propre à Tailwind (`@theme`, base). Supprimable.
    - `ds.css` : classes sémantiques `ds-*` en `@apply` Tailwind. **Seul fichier (avec `tailwind.css`) qui connaît Tailwind** : quitter Tailwind = réécrire uniquement `ds.css`.
    - Ne jamais utiliser de classes Tailwind dans un `.vue` (même dans le DS : passer par `ds.css`).
- Accessibilité : les contrôles de formulaire passent par `DsField` + `useFieldControl()` (`field-context.ts`) pour l'id, `aria-invalid` et `aria-describedby`.

**Références conformes** : `Login.vue`, `Register.vue`, `CreateAccount.vue` (côté DS/i18n).

### 5.2 Textes et i18n

- **Aucun texte en dur** (templates, ViewModels, props par défaut). Tout passe par `vue-i18n` (`$t(...)` / `useI18n()`), clés dans `fr.json`, rangées par domaine : `auth.*`, `account.*`, `common.*`, `errors.*`.
- Les **erreurs** : l'API renvoie un `code` (+ `params`, `fieldErrors`) converti en `AppError` par `toAppError`. Le ViewModel conserve le **code** (ou l'`AppError`) ; l'affichage se fait avec `useErrorMessage()` qui traduit `errors.<code>` (repli sur `errors.unknown`). Ne jamais mettre de message français dans un ViewModel.
- Toute nouvelle clé est ajoutée dans `fr.json`, au bon domaine.

### 5.3 Types de comptes et polymorphisme (OCP)

- Types actuels : `CURRENT`, `SAVINGS_BOOK`, `PEA`, `SECURITIES`, `LIFE_INSURANCE`, `PER`, `PEE` (compte courant, livret, PEA, compte-titres, assurance-vie, PER, PEE). Champs communs : banque, devise, nom, solde, description, type, propriétaires (nom + part en %) ; champs spécifiques selon le type.
- **Pas de `switch` / `if-else` en cascade sur le type de compte** dans les Views, ViewModels ou UseCases. Passer par un registre / une map de stratégies (composant de formulaire par type, builder de payload par type, mapper par type…). Ajouter un type ne doit pas obliger à modifier du code existant en dehors d'un seul point d'enregistrement.
- Dans les formulaires, montants, parts et dates restent des **`string`** (pas de float ; dates ISO `yyyy-MM-dd`).

### 5.4 Logique métier

- **Aucun calcul de statistiques / agrégats dans le front** (totaux, pourcentages, répartitions…). Si une donnée dérivée manque, l'ajouter à l'API backend.
- Pas de règles de garde-fou métier superflues : le domaine reste descriptif.

### 5.5 TypeScript

- **100 % TypeScript** : jamais de `.js`, jamais de `<script>` sans `lang="ts"` (`<script setup lang="ts">`).
- Pas de `any`, `@ts-ignore` ni cast `as` forcé sans commentaire de justification ; préférer `unknown` + narrowing. Typer `defineProps` / `defineEmits` (pas de `defineProps({...})` JS ni de `defineEmits(['x'])` non typé).
- `npm run type-check` (`vue-tsc --build`) doit passer.

### 5.6 Code généré (orval)

- `src/modules/*/infrastructure/generated/` est **généré : ne jamais l'éditer à la main**.
- Régénération : `npm run generate:api` (ou `generate:api:watch`) ; le backend doit tourner et `VITE_API_URL` (dans `.env`) doit pointer dessus.
- `orval.config.ts` a **une entrée par module**, filtrée par **tag OpenAPI** (`auth`, `dashboard`), sortie en `tags-split` dans `modules/<m>/infrastructure/generated/{api,models}`. Pour un nouveau module : ajouter une entrée via la fonction `output('<module>')` et s'assurer que les endpoints du backend portent le tag correspondant.
- Tous les appels HTTP passent par `customInstance` : pas de `fetch` / `axios` / `superagent` sauvage ailleurs.

### 5.7 Authentification et stockage

- L'access token vit **en mémoire** dans le singleton `accessToken` (`AccessToken`) ; le refresh passe par le cookie (`withCredentials`) et `POST /auth/refresh`, géré dans `httpClient.ts` (intercepteurs). Ne pas dupliquer cette logique.
- **Ne pas écrire le token dans `localStorage`/`sessionStorage`**, ni utiliser le stockage navigateur directement dans un repository.
- Routes protégées : `meta: { requiresAuth: true }` + garde `router.beforeEach`.

## 6. Ajouter une fonctionnalité (checklist)

1. **Module** : créer/réutiliser `src/modules/<nom>/` avec `domain`, `application`, `infrastructure`, `presentation`, `di`.
2. **Backend** : l'endpoint existe avec le bon tag OpenAPI → entrée dans `orval.config.ts` → `npm run generate:api`.
3. **Domain** : modèles + interface `XxxRepository`.
4. **Infrastructure** : mapper(s) + `XxxApiRepository` (utilise `getXxx()` généré).
5. **Application** : `XxxUseCase` (`execute`).
6. **Presentation** : `XxxViewModel` (`reactive state`, erreurs sous forme de code), puis la View avec uniquement des `Ds*`.
7. **DI** : enregistrer repository/use case (singleton) et ViewModel (scoped) dans `XxxModule.ts`, noms = noms des paramètres de constructeur ; ajouter le module dans `ModuleDi.ts`.
8. **Router** : ajouter la route (`meta.requiresAuth`).
9. **i18n** : clés dans `fr.json`.
10. **Manque visuel** : étendre le DS, jamais la View.

Avant de proposer du code :

- [ ] Views : uniquement des `Ds*`, zéro CSS / classe utilitaire
- [ ] Aucun texte en dur (templates **et** ViewModels), tout dans `fr.json`
- [ ] Flux respecté, DTO orval non exposés au-delà de `infrastructure/`
- [ ] Nom des paramètres de constructeur = nom d'enregistrement awilix
- [ ] Aucun fichier généré modifié, aucun `switch` sur le type de compte
- [ ] Aucun calcul métier côté front, aucun `localStorage`
- [ ] 100 % TS, pas de `any`, `npm run type-check` passe

## 7. Commandes

```bash
npm install
npm run dev               # serveur Vite
npm run build             # type-check + build
npm run type-check        # vue-tsc --build
npm run generate:api      # orval (backend requis, VITE_API_URL)
npm run generate:api:watch
npm run preview
```

Pas de script `lint` ni `test` dans `package.json` (ESLint, Prettier, vitest et Playwright sont installés). Env : Node `^22.18.0 || >=24.12.0`.

## 8. Dette connue — à ne pas reproduire

Écarts constatés dans le code actuel (à corriger quand on touche ces fichiers, jamais à imiter) :

- **`DashboardView.vue`** : n'utilise pas le DS (HTML brut + classes Tailwind) et contient des textes en dur. À refaire avec des `Ds*` (cartes de résumé, liste de comptes, badge de statut → nouveaux composants DS) et des clés i18n. Il affiche aussi `accountStatus` / `type` bruts (clés i18n à prévoir).
- **ViewModels (`LoginViewModel`, `DashboardViewModel`)** : messages d'erreur français en dur → utiliser le code d'erreur + `useErrorMessage`.
- **`CreateAccount.vue`** : contient un `switch` sur le type de compte et la construction du payload dans la View, des référentiels (banques, devises) en dur et un `console.log` ; la route `/test` y mène. À déplacer dans un ViewModel + registre par type (OCP).
- **`AuthApiRepository.login`** : écrit le token dans `localStorage` (interdit, voir 5.7).
- **Router** : la garde résout `'AccessToken'` alors que l'enregistrement est `'accessToken'` (awilix est sensible à la casse et en mode `strict`).
- **`src/common/SuccessMessage.vue`** : composant non typé, texte par défaut en dur, hors DS.
- **`CreateOwner.vue`** : `defineEmits` non typé ; bouton « supprimer » via `DsPrimaryButton` (prévoir une variante DS).
- **`tsconfig.app.json`** : `allowJs` / `checkJs` encore à `true` alors que le projet est full TS (à retirer).
- **Tests** : `tests/example.spec.ts` est le gabarit Playwright, aucun vrai test ; `README.md` est encore celui du template Vite (`poim`).