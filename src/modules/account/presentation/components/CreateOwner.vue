<script setup lang="ts">
import DsPrimaryButton from "@/design-system/components/DsPrimaryButton.vue";
import DsInput from "@/design-system/components/DsInput.vue";
import DsField from "@/design-system/components/DsField.vue";
import DsStack from "@/design-system/components/DsStack.vue";

const props = defineProps<{
  owner: {
    name: string;
    share: string;
  };
  index: number;
}>();

const emit = defineEmits(['remove-owner']);
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
        v-if="props.index > 0"
        :text="$t('account.fields.removeOwner')"
        type="button"
        @click="emit('remove-owner', props.index)"
    />
  </DsStack>
</template>