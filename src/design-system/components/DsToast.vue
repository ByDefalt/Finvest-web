<script lang="ts" setup>
withDefaults(defineProps<{
  message: string
  variant?: 'info' | 'success' | 'error'
}>(), { variant: 'info' })

defineEmits<{ (e: 'close'): void }>()
</script>

<template>
  <div :class="['ds-toast', `ds-toast--${variant}`]" :role="variant === 'error' ? 'alert' : 'status'">
    <p class="ds-toast__message">{{ message }}</p>
    <button :aria-label="$t('common.close')" class="ds-toast__close" type="button" @click="$emit('close')">×</button>
  </div>
</template>
