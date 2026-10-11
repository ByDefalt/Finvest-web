<script lang="ts" setup>

import DsToast from './DsToast.vue'
import {useToast} from "@/design-system/components/useToast.ts";

const { toasts, dismiss } = useToast()
</script>

<template>
  <div class="ds-toast-container">
    <DsToast
        v-for="toast in toasts"
        :key="toast.id"
        :message="toast.message"
        :variant="toast.variant"
        @close="dismiss(toast.id)"/>
  </div>
</template>
