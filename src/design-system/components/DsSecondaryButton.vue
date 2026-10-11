<script lang="ts" setup>
defineProps<{
  type: 'button' | 'submit';
  disabled?: boolean;
  loading?: boolean;
  text: string;
}>()
</script>

<template>
  <button
      :disabled="disabled || loading"
      :type="type"
      class="ds-button ds-button--secondary">
    {{ loading ? $t('common.loading') : text }}
  </button>
</template>
