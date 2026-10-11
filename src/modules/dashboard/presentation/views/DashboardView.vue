<script lang="ts" setup>
import {onMounted} from "vue";
import {resolve} from "@/di/di.ts";
import {DashboardViewModel} from "@/modules/dashboard/presentation/composables/DashboardViewModel.ts";

const viewModel = resolve<DashboardViewModel>("dashboardViewModel");

onMounted(() => {
  viewModel.getDashboard();
});
</script>

<template>
  <main class="min-h-screen bg-background text-foreground">
    <div class="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

      <!-- Header -->
      <header class="mb-8">
        <h1 class="text-3xl font-bold tracking-tight">
          Dashboard
        </h1>

        <p class="mt-2 text-muted-foreground">
          Vue d'ensemble de vos comptes
        </p>
      </header>

      <!-- Chargement -->
      <div
          v-if="viewModel.state.isLoading"
          class="flex min-h-[300px] items-center justify-center"
      >
        <p class="text-muted-foreground">
          Chargement du dashboard...
        </p>
      </div>

      <!-- Erreur -->
      <div
          v-else-if="viewModel.state.error"
          class="rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive"
          role="alert"
      >
        {{ viewModel.state.error }}
      </div>

      <!-- Données -->
      <template v-else-if="viewModel.state.dashboardData">

        <!-- Summary -->
        <section
            aria-label="Résumé"
            class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          <!-- Total comptes -->
          <article
              class="rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm"
          >
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-muted-foreground">
                  Comptes
                </p>

                <p class="mt-2 text-3xl font-bold tracking-tight">
                  {{ viewModel.state.dashboardData.totalAccounts }}
                </p>
              </div>

              <div
                  class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary"
              >
                <span class="text-lg">€</span>
              </div>
            </div>
          </article>

          <!-- Comptes actifs -->
          <article
              class="rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm"
          >
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-muted-foreground">
                  Comptes actifs
                </p>

                <p class="mt-2 text-3xl font-bold tracking-tight">
                  {{ viewModel.state.dashboardData.totalActiveAccounts }}
                </p>
              </div>

              <div
                  class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary"
              >
                <span class="text-lg">✓</span>
              </div>
            </div>
          </article>

          <!-- Solde total -->
          <article
              class="rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm sm:col-span-2 lg:col-span-1"
          >
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-muted-foreground">
                  Solde total
                </p>

                <p class="mt-2 text-3xl font-bold tracking-tight">
                  {{ viewModel.state.dashboardData.totalBalance }}
                </p>
              </div>

              <div
                  class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary"
              >
                <span class="text-lg">€</span>
              </div>
            </div>
          </article>
        </section>

        <!-- Accounts -->
        <section class="mt-10">
          <div class="mb-5">
            <h2 class="text-xl font-semibold tracking-tight">
              Mes comptes
            </h2>

            <p class="mt-1 text-sm text-muted-foreground">
              Liste de vos comptes bancaires
            </p>
          </div>

          <!-- Aucun compte -->
          <div
              v-if="viewModel.state.dashboardData.accounts.length === 0"
              class="rounded-xl border border-dashed border-border bg-card p-10 text-center"
          >
            <p class="font-medium">
              Aucun compte
            </p>

            <p class="mt-1 text-sm text-muted-foreground">
              Vous n'avez actuellement aucun compte enregistré.
            </p>
          </div>

          <!-- Liste des comptes -->
          <div
              v-else
              class="grid gap-4 lg:grid-cols-2"
          >
            <article
                v-for="account in viewModel.state.dashboardData.accounts"
                :key="account.id"
                class="rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm transition-shadow hover:shadow-md"
            >
              <!-- Account header -->
              <div class="flex items-start justify-between gap-4">
                <div class="min-w-0">
                  <h3 class="truncate text-lg font-semibold">
                    {{ account.name }}
                  </h3>

                  <p class="mt-1 text-sm text-muted-foreground">
                    {{ account.bankName }}
                  </p>
                </div>

                <!-- Status -->
                <span
                    :class="{
                    'bg-primary/10 text-primary':
                      account.accountStatus === 'ACTIVE',

                    'bg-muted text-muted-foreground':
                      account.accountStatus === 'CLOSED'
                  }"
                    class="shrink-0 rounded-full px-2.5 py-1 text-xs font-medium"
                >
                  {{ account.accountStatus }}
                </span>
              </div>

              <!-- Main balance -->
              <div class="mt-6">
                <p class="text-sm text-muted-foreground">
                  Solde
                </p>

                <p class="mt-1 text-2xl font-bold tracking-tight">
                  {{ account.balance }}
                  <span class="text-base font-medium text-muted-foreground">
                    {{ account.currency }}
                  </span>
                </p>
              </div>

              <!-- Account information -->
              <div
                  class="mt-6 grid grid-cols-2 gap-4 border-t border-border pt-5"
              >
                <div>
                  <p class="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Type
                  </p>

                  <p class="mt-1 text-sm font-medium">
                    {{ account.type }}
                  </p>
                </div>

                <div>
                  <p class="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Créé le
                  </p>

                  <p class="mt-1 text-sm font-medium">
                    {{ account.createdAt }}
                  </p>
                </div>

                <div v-if="account.closedAt">
                  <p class="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Fermé le
                  </p>

                  <p class="mt-1 text-sm font-medium">
                    {{ account.closedAt }}
                  </p>
                </div>
              </div>

              <!-- Description -->
              <p
                  v-if="account.description"
                  class="mt-5 border-t border-border pt-5 text-sm text-muted-foreground"
              >
                {{ account.description }}
              </p>

              <!-- Owners -->
              <div
                  v-if="account.accountOwners.length > 0"
                  class="mt-5 border-t border-border pt-5"
              >
                <h4 class="text-sm font-medium">
                  Titulaires
                </h4>

                <ul class="mt-3 space-y-2">
                  <li
                      v-for="(owner, index) in account.accountOwners"
                      :key="owner.email ?? owner.name ?? index"
                      class="flex items-center justify-between text-sm"
                  >
                    <span class="text-muted-foreground">
                      {{ owner.name ?? owner.email ?? "Titulaire inconnu" }}
                    </span>

                    <span class="font-medium">
                      {{ owner.ownershipPercentage }} %
                    </span>
                  </li>
                </ul>
              </div>
            </article>
          </div>
        </section>
      </template>
    </div>
  </main>
</template>