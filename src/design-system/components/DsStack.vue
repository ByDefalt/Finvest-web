<script lang="ts" setup>
withDefaults(defineProps<{
  gap?: 'sm' | 'md' | 'lg'
  direction?: 'vertical' | 'horizontal'
}>(), { gap: 'md', direction: 'vertical' })
</script>

<template>
  <div :class="['ds-stack', `ds-stack--${gap}`, `ds-stack--${direction}`]">
    <slot/>
  </div>
</template>
