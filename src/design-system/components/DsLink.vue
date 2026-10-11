<script lang="ts" setup>
import { RouterLink } from 'vue-router'

defineProps<{
  to: string
}>()
</script>

<template>
  <RouterLink :to="to" class="ds-link">
    <slot/>
  </RouterLink>
</template>
