<script lang="ts" setup>
defineProps<{
  message?: string | null
}>()
</script>

<template>
  <p v-if="message" class="ds-error-message" role="alert">{{ message }}</p>
</template>
