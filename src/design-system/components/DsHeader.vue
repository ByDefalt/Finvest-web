<script lang="ts" setup>
withDefaults(defineProps<{
  title: string
  subtitle?: string
  align?: 'start' | 'center'
}>(), { align: 'center' })
</script>

<template>
  <div :class="['ds-header', `ds-header--${align}`]">
    <h1 class="ds-header__title">{{ title }}</h1>
    <p v-if="subtitle" class="ds-header__subtitle">{{ subtitle }}</p>
  </div>
</template>
