<script lang="ts" setup>
// Colonnes côte à côte à partir du breakpoint lg, empilées en dessous (mobile / tablette).
withDefaults(defineProps<{
  gap?: 'sm' | 'md' | 'lg'
}>(), { gap: 'lg' })
</script>

<template>
  <div :class="['ds-columns', `ds-columns--${gap}`]">
    <slot/>
  </div>
</template>
