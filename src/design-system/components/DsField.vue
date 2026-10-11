<script lang="ts" setup>
import { computed, useId } from 'vue'
import { provideFieldContext } from './field-context.ts'

const props = defineProps<{
  label: string
  hint?: string
  error?: string | null
  required?: boolean
  id?: string
}>()

const generatedId = useId() // Vue 3.5+
const controlId = computed(() => props.id ?? generatedId)
const hintId = computed(() => `${controlId.value}-hint`)
const errorId = computed(() => `${controlId.value}-error`)

provideFieldContext({
  id: controlId,
  required: computed(() => !!props.required),
  invalid: computed(() => !!props.error),
  describedBy: computed(() =>
    props.error ? errorId.value : props.hint ? hintId.value : undefined,
  ),
})
</script>

<template>
  <div class="ds-field">
    <label :for="controlId" class="ds-field__label">
      {{ label }}
      <span v-if="required" aria-hidden="true" class="ds-field__required">*</span>
    </label>

    <slot/>

    <p v-if="error" :id="errorId" class="ds-field__error" role="alert">{{ error }}</p>
    <p v-else-if="hint" :id="hintId" class="ds-field__hint">{{ hint }}</p>
  </div>
</template>
