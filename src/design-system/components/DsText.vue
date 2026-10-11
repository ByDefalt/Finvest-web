<script lang="ts" setup>
withDefaults(defineProps<{
  size?: 'sm' | 'md'
  tone?: 'default' | 'muted' | 'destructive'
  align?: 'start' | 'center'
}>(), { size: 'md', tone: 'default', align: 'start' })
</script>

<template>
  <p :class="[`ds-text--${size}`, `ds-text--${tone}`, `ds-text--${align}`]">
    <slot/>
  </p>
</template>
