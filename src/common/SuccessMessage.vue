<script setup>
defineProps({
  title: {
    type: String,
    default: 'Opération réussie !'
  },
  message: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div class="success-screen">
    <h1>{{ title }}</h1>
    <p>{{ message }}</p>
  </div>
</template>