<script lang="ts" setup>
withDefaults(defineProps<{
  size?: 'sm' | 'md' | 'lg'
}>(), { size: 'md' })
</script>

<template>
  <div class="ds-page">
    <div :class="['ds-page__content', `ds-page__content--${size}`]">
      <slot/>
    </div>
  </div>
</template>
