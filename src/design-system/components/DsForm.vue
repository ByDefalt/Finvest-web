<script lang="ts" setup>
defineEmits<{ (e: 'submit'): void }>()
</script>

<template>
  <form class="ds-form" @submit.prevent="$emit('submit')">
    <slot/>
  </form>
</template>
