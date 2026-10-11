<script lang="ts" setup generic="T extends string | number">
import { useFieldControl } from './field-context.ts'

defineProps<{
  options: { value: T; label: string; disabled?: boolean }[]
  placeholder?: string
}>()

const model = defineModel<T | null>({ required: true })
const fieldAttrs = useFieldControl()
</script>

<template>
  <select v-model="model" v-bind="fieldAttrs" class="ds-select">
    <option v-if="placeholder" :value="null" disabled>{{ placeholder }}</option>
    <option
        v-for="option in options"
        :key="option.value"
        :disabled="option.disabled"
        :value="option.value">
      {{ option.label }}
    </option>
  </select>
</template>