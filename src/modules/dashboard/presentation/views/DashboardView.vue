<script setup lang="ts">
import { onMounted } from "vue";
import { resolve } from "@/di/di.ts";
import {DashboardViewModel} from "@/modules/dashboard/presentation/composables/DashboardViewModel.ts";

const viewModel = resolve<DashboardViewModel>("dashboardViewModel");

onMounted(() => {
  viewModel.getDashboard();
});
</script>

<template>
  <main class="dashboard">
    <h1>Dashboard</h1>

    <!-- Chargement -->
    <p v-if="viewModel.state.isLoading">
      Chargement du dashboard...
    </p>

    <!-- Erreur -->
    <div v-else-if="viewModel.state.error" class="error">
      {{ viewModel.state.error }}
    </div>

    <!-- Données -->
    <template v-else-if="viewModel.state.dashboardData">
      <section class="summary">
        <article class="card">
          <h2>Comptes</h2>
          <strong>{{ viewModel.state.dashboardData.totalAccounts }}</strong>
        </article>

        <article class="card">
          <h2>Comptes actifs</h2>
          <strong>
            {{ viewModel.state.dashboardData.totalActiveAccounts }}
          </strong>
        </article>

        <article class="card">
          <h2>Solde total</h2>
          <strong>
            {{ viewModel.state.dashboardData.totalBalance }}
          </strong>
        </article>
      </section>

      <section class="accounts">
        <h2>Mes comptes</h2>

        <p v-if="viewModel.state.dashboardData.accounts.length === 0">
          Aucun compte.
        </p>

        <div
            v-else
            v-for="account in viewModel.state.dashboardData.accounts"
            :key="account.id"
            class="account"
        >
          <div class="account-header">
            <div>
              <h3>{{ account.name }}</h3>
              <span>{{ account.bankName }}</span>
            </div>

            <span
                class="status"
                :class="{
                active: account.accountStatus === 'ACTIVE',
                closed: account.accountStatus === 'CLOSED'
              }"
            >
              {{ account.accountStatus }}
            </span>
          </div>

          <div class="account-info">
            <div>
              <span>Solde</span>
              <strong>
                {{ account.balance }} {{ account.currency }}
              </strong>
            </div>

            <div>
              <span>Type</span>
              <strong>{{ account.type }}</strong>
            </div>

            <div>
              <span>Créé le</span>
              <strong>{{ account.createdAt }}</strong>
            </div>

            <div v-if="account.closedAt">
              <span>Fermé le</span>
              <strong>{{ account.closedAt }}</strong>
            </div>
          </div>

          <p v-if="account.description">
            {{ account.description }}
          </p>

          <div v-if="account.accountOwners.length > 0">
            <h4>Titulaires</h4>

            <ul>
              <li
                  v-for="(owner, index) in account.accountOwners"
                  :key="owner.email ?? owner.name ?? index"
              >
                {{ owner.name ?? owner.email ?? "Titulaire inconnu" }}
                — {{ owner.ownershipPercentage }} %
              </li>
            </ul>
          </div>
        </div>
      </section>
    </template>
  </main>
</template>

<style scoped>
.dashboard {
  padding: 2rem;
}

.summary {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
}

.card {
  padding: 1.5rem;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.card h2 {
  margin: 0 0 0.5rem;
  font-size: 1rem;
}

.card strong {
  font-size: 1.8rem;
}

.accounts {
  margin-top: 2rem;
}

.account {
  padding: 1.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.account-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
}

.account-header h3 {
  margin: 0;
}

.account-header span {
  color: #666;
}

.status {
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  font-size: 0.8rem;
}

.status.active {
  background: #dff6e4;
  color: #176b2c;
}

.status.closed {
  background: #eee;
  color: #666;
}

.account-info {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

.account-info div {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.account-info span {
  color: #666;
  font-size: 0.85rem;
}

.error {
  padding: 1rem;
  color: #b00020;
  background: #ffe5e5;
  border-radius: 6px;
}

@media (max-width: 800px) {
  .summary {
    grid-template-columns: 1fr;
  }

  .account-info {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>