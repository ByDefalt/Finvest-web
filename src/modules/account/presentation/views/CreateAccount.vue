<script lang="ts" setup>
import { computed, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import DsCard from '@/design-system/components/DsCard.vue'
import DsCenteredPage from '@/design-system/components/DsCenteredPage.vue'
import DsForm from '@/design-system/components/DsForm.vue'
import DsHeader from '@/design-system/components/DsHeader.vue'
import DsStack from '@/design-system/components/DsStack.vue'
import DsField from '@/design-system/components/DsField.vue'
import DsInput from '@/design-system/components/DsInput.vue'
import DsSelect from '@/design-system/components/DsSelect.vue'
import DsPrimaryButton from '@/design-system/components/DsPrimaryButton.vue'
import CreateOwner from '@/modules/account/presentation/components/CreateOwner.vue'

type AccountType = 'CURRENT' | 'SAVINGS_BOOK' | 'PEA' | 'SECURITIES' | 'LIFE_INSURANCE' | 'PER' | 'PEE'
type Option<T extends string | number> = { value: T; label: string }
type Owner = { name: string; share: string }

const { t } = useI18n()

// Référentiels : à charger depuis l'API (via le ViewModel)
const banks: Option<number>[] = [{ value: 1, label: 'Ma banque' }]
const currencies: Option<number>[] = [{ value: 1, label: 'EUR' }]
const managementTypes: Option<number>[] = [{ value: 1, label: 'Gestion libre' }]

const typeOptions = computed<Option<AccountType>[]>(() =>
    (['CURRENT', 'SAVINGS_BOOK', 'PEA', 'SECURITIES', 'LIFE_INSURANCE', 'PER', 'PEE'] as const).map((value) => ({
      value,
      label: t(`account.types.${value}`),
    })),
)

// Montants, parts et dates restent des strings : pas de float, dates au format ISO (yyyy-MM-dd)
const state = reactive({
  // table accounts
  bankId: null as number | null,
  name: '',
  currencyId: null as number | null,
  balance: '0',
  description: '',
  type: null as AccountType | null,
  // compte_courants
  iban: '',
  bic: '',
  accountNumber: '', // aussi utilisé par comptes_titres
  overdraftLimit: '0',
  holderName: '',
  // livrets
  interestRate: '0',
  ceiling: '',
  // peas
  depositLimit: '',
  // peas, assurances_vie, pers, pees
  openingDate: '',
  // assurances_vie, pers
  contractNumber: '',
  managementTypeId: null as number | null,
  // pees
  employer: '',
  // owners
  owners: [{ name: '', share: '' }] as Owner[],
})

function addOwner() {
  state.owners.push({ name: '', share: '' })
}

function removeOwner(index: number) {
  state.owners.splice(index, 1)
}

// Ne garde que les champs du type choisi : les valeurs saisies puis abandonnées en changeant de type sont ignorées
function buildPayload() {
  const common = {
    bankId: state.bankId,
    currencyId: state.currencyId,
    name: state.name,
    balance: state.balance,
    description: state.description || null,
    owners: state.owners.map(({ name, share }) => ({ name, share })),
  }
  switch (state.type) {
    case 'CURRENT':
      return {
        ...common,
        type: state.type,
        iban: state.iban,
        bic: state.bic,
        accountNumber: state.accountNumber,
        overdraftLimit: state.overdraftLimit,
        holderName: state.holderName,
      }
    case 'SAVINGS_BOOK':
      return { ...common, type: state.type, interestRate: state.interestRate, ceiling: state.ceiling }
    case 'PEA':
      return { ...common, type: state.type, openingDate: state.openingDate, depositLimit: state.depositLimit }
    case 'SECURITIES':
      return { ...common, type: state.type, accountNumber: state.accountNumber }
    case 'LIFE_INSURANCE':
    case 'PER':
      return {
        ...common,
        type: state.type,
        contractNumber: state.contractNumber,
        openingDate: state.openingDate,
        managementTypeId: state.managementTypeId,
      }
    case 'PEE':
      return { ...common, type: state.type, openingDate: state.openingDate, employer: state.employer }
    default:
      return null
  }
}

function submit() {
  const payload = buildPayload()
  console.log(payload) // → viewModel.submitCreateAccount(payload)
}
</script>

<template>
  <DsCenteredPage size="lg">
    <DsCard>
      <DsForm @submit="submit">
        <DsHeader :title="$t('account.create.title')"/>

        <DsStack gap="md">
          <!-- Champs communs (table accounts) -->
          <DsField :label="$t('account.fields.bank')" required>
            <DsSelect v-model="state.bankId" :options="banks" :placeholder="$t('account.fields.select')"/>
          </DsField>
          <DsField :label="$t('account.fields.name')" required>
            <DsInput v-model="state.name" type="text"/>
          </DsField>
          <DsField :label="$t('account.fields.currency')" required>
            <DsSelect v-model="state.currencyId" :options="currencies" :placeholder="$t('account.fields.select')"/>
          </DsField>
          <DsField :label="$t('account.fields.balance')" required>
            <DsInput v-model="state.balance" inputmode="decimal" type="text"/>
          </DsField>
          <DsField :label="$t('account.fields.description')">
            <DsInput v-model="state.description" type="text"/>
          </DsField>
          <DsField :label="$t('account.fields.type')" required>
            <DsSelect v-model="state.type" :options="typeOptions" :placeholder="$t('account.fields.select')"/>
          </DsField>

          <!-- Compte courant -->
          <template v-if="state.type === 'CURRENT'">
            <DsField :label="$t('account.fields.iban')" required>
              <DsInput v-model="state.iban" autocomplete="off" type="text"/>
            </DsField>
            <DsField :label="$t('account.fields.bic')" required>
              <DsInput v-model="state.bic" autocomplete="off" type="text"/>
            </DsField>
            <DsField :label="$t('account.fields.accountNumber')" required>
              <DsInput v-model="state.accountNumber" autocomplete="off" type="text"/>
            </DsField>
            <DsField :label="$t('account.fields.overdraftLimit')" required>
              <DsInput v-model="state.overdraftLimit" inputmode="decimal" type="text"/>
            </DsField>
            <DsField :label="$t('account.fields.holderName')" required>
              <DsInput v-model="state.holderName" type="text"/>
            </DsField>
          </template>

          <!-- Livret -->
          <template v-else-if="state.type === 'SAVINGS_BOOK'">
            <DsField :label="$t('account.fields.interestRate')" required>
              <DsInput v-model="state.interestRate" inputmode="decimal" type="text"/>
            </DsField>
            <DsField :label="$t('account.fields.ceiling')" required>
              <DsInput v-model="state.ceiling" inputmode="decimal" type="text"/>
            </DsField>
          </template>

          <!-- PEA -->
          <template v-else-if="state.type === 'PEA'">
            <DsField :label="$t('account.fields.openingDate')" required>
              <DsInput v-model="state.openingDate" type="date"/>
            </DsField>
            <DsField :label="$t('account.fields.depositLimit')" required>
              <DsInput v-model="state.depositLimit" inputmode="decimal" type="text"/>
            </DsField>
          </template>

          <!-- Compte-titres -->
          <template v-else-if="state.type === 'SECURITIES'">
            <DsField :label="$t('account.fields.accountNumber')" required>
              <DsInput v-model="state.accountNumber" autocomplete="off" type="text"/>
            </DsField>
          </template>

          <!-- Assurance-vie et PER : mêmes champs -->
          <template v-else-if="state.type === 'LIFE_INSURANCE' || state.type === 'PER'">
            <DsField :label="$t('account.fields.contractNumber')" required>
              <DsInput v-model="state.contractNumber" autocomplete="off" type="text"/>
            </DsField>
            <DsField :label="$t('account.fields.openingDate')" required>
              <DsInput v-model="state.openingDate" type="date"/>
            </DsField>
            <DsField :label="$t('account.fields.managementType')" required>
              <DsSelect v-model="state.managementTypeId" :options="managementTypes" :placeholder="$t('account.fields.select')"/>
            </DsField>
          </template>

          <!-- PEE -->
          <template v-else-if="state.type === 'PEE'">
            <DsField :label="$t('account.fields.openingDate')" required>
              <DsInput v-model="state.openingDate" type="date"/>
            </DsField>
            <DsField :label="$t('account.fields.employer')" required>
              <DsInput v-model="state.employer" type="text"/>
            </DsField>
          </template>

          <!-- Propriétaires -->
          <template v-for="(owner, index) in state.owners" :key="index">
            <CreateOwner :owner="owner" :index="index" :total-owners="state.owners.length" @remove-owner="removeOwner" @add-owner="addOwner"/>
          </template>
        </DsStack>

        <DsPrimaryButton :text="$t('account.create.submit')" type="submit"/>
      </DsForm>
    </DsCard>
  </DsCenteredPage>
</template>