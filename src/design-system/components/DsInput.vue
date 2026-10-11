<script lang="ts" setup>
import { useFieldControl } from './field-context.ts'

withDefaults(defineProps<{
  type?: 'text' | 'email' | 'password' | 'number' | 'search' | 'tel' | 'url' | 'date'
}>(), { type: 'text' })

const model = defineModel<string>({ required: true })
const fieldAttrs = useFieldControl()
</script>

<template>
  <input
      v-model="model"
      v-bind="fieldAttrs"
      :type="type"
      class="ds-input"
  />
</template>
