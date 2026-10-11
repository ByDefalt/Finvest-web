<script setup lang="ts">
import DsPrimaryButton from "@/design-system/components/DsPrimaryButton.vue";
import DsInput from "@/design-system/components/DsInput.vue";
import DsField from "@/design-system/components/DsField.vue";
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

const emit = defineEmits(['remove-owner', 'add-owner']);
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
    <DsPrimaryButton
        :text="$t('account.fields.removeOwner')"
        type="button"
        @click="handleRemove"
        :disabled="props.totalOwners <= 1 || isRemoving"
    />
  </DsStack>
  <DsPrimaryButton
      v-if="props.index === props.totalOwners - 1"
      :text="$t('account.fields.addOwner')"
      type="button"
      @click="emit('add-owner')"
  />
</template>