import { computed, inject, provide, type ComputedRef, type InjectionKey } from 'vue'

interface FieldContext {
  id: ComputedRef<string>
  required: ComputedRef<boolean>
  invalid: ComputedRef<boolean>
  describedBy: ComputedRef<string | undefined>
}

const FieldKey: InjectionKey<FieldContext> = Symbol('DsField')

// Appelé par DsField
export function provideFieldContext(ctx: FieldContext) {
  provide(FieldKey, ctx)
}

// Appelé par chaque contrôle (DsInput, DsTextarea, DsSelect...)
export function useFieldControl() {
  const field = inject(FieldKey, null) // null hors DsField
  return computed(() =>
    field
      ? {
          id: field.id.value,
          required: field.required.value || undefined,
          'aria-invalid': field.invalid.value || undefined,
          'aria-describedby': field.describedBy.value,
        }
      : {},
  )
}
