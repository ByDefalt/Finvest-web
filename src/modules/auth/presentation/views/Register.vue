<script lang="ts" setup>
import {resolve} from "@/di/di.ts";
import DsCenteredPage from "@/design-system/components/DsCenteredPage.vue";
import DsCard from "@/design-system/components/DsCard.vue";
import DsLink from "@/design-system/components/DsLink.vue";
import DsForm from "@/design-system/components/DsForm.vue";
import DsHeader from "@/design-system/components/DsHeader.vue";
import DsText from "@/design-system/components/DsText.vue";
import DsStack from "@/design-system/components/DsStack.vue";
import DsField from "@/design-system/components/DsField.vue";
import DsInput from "@/design-system/components/DsInput.vue";
import DsErrorMessage from "@/design-system/components/DsErrorMessage.vue";
import DsPrimaryButton from "@/design-system/components/DsPrimaryButton.vue";
import type {RegisterViewModel} from "@/modules/auth/presentation/composables/RegisterViewModel.ts";

const viewModel = resolve<RegisterViewModel>("registerViewModel");
</script>
<template>
  <DsCenteredPage size="md">
    <DsCard>
      <DsStack gap="lg">
        <DsForm @submit="viewModel.submitRegister">
          <DsHeader :subtitle="$t('auth.register.subtitle')" :title="$t('auth.register.title')"/>
          <DsStack gap="md">
            <DsField :label="$t('auth.fields.name.label')" required>
              <DsInput v-model="viewModel.state.name" :placeholder="$t('auth.fields.name.placeholder')" autocomplete="name" type="text"/>
            </DsField>
            <DsField :label="$t('auth.fields.email.label')" required>
              <DsInput v-model="viewModel.state.email" :placeholder="$t('auth.fields.email.placeholder')" autocomplete="email" type="email"/>
            </DsField>
            <DsField :label="$t('auth.fields.password.label')" required>
              <DsInput v-model="viewModel.state.password" :placeholder="$t('auth.fields.password.placeholder')" autocomplete="new-password" minlength="6" type="password"/>
            </DsField>
          </DsStack>
          <DsErrorMessage :message="viewModel.state.error"/>
          <DsPrimaryButton :loading="viewModel.state.isLoading" :text="$t('auth.register.submit')" type="submit"/>
        </DsForm>
        <DsText align="center" size="sm" tone="muted">
          <DsLink to="/login">{{ $t('auth.register.toLogin') }}</DsLink>
        </DsText>
      </DsStack>
    </DsCard>
  </DsCenteredPage>
</template>

