<script setup lang="ts">
import DsPrimaryButton from "@/design-system/components/DsPrimaryButton.vue";
import DsInput from "@/design-system/components/DsInput.vue";
import DsField from "@/design-system/components/DsField.vue";
import DsFieldAction from "@/design-system/components/DsFieldAction.vue";
import DsStack from "@/design-system/components/DsStack.vue";
import { ref } from 'vue';

const props = defineProps<{
  owner: {
    name: string;
    share: string;
  };
  index: number;
  totalOwners: number;
}>();

const emit = defineEmits<{ (e: 'remove-owner', index: number): void }>();
const isRemoving = ref(false);

async function handleRemove() {
  // Prevent rapid clicks
  if (isRemoving.value || props.totalOwners <= 1) return;

  isRemoving.value = true;
  try {
    emit('remove-owner', props.index);
  } finally {
    isRemoving.value = false;
  }
}
</script>

<template>
  <DsStack direction="horizontal" gap="sm">
    <DsField :label="$t('account.fields.ownerName')" required>
      <DsInput v-model="owner.name" type="text"/>
    </DsField>
    <DsField :label="$t('account.fields.ownerShare')" required>
      <DsInput v-model="owner.share" inputmode="decimal" type="text"/>
    </DsField>
    <DsFieldAction>
      <DsPrimaryButton
          :text="$t('account.fields.removeOwner')"
          type="button"
          @click="handleRemove"
          :disabled="props.totalOwners <= 1 || isRemoving"
      />
    </DsFieldAction>
  </DsStack>
</template>
