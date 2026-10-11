import { readonly, ref } from 'vue'

export type ToastVariant = 'info' | 'success' | 'error'

export interface Toast {
  id: number
  variant: ToastVariant
  message: string
}

// État partagé au niveau du module : un seul conteneur de toasts pour toute l'app
const toasts = ref<Toast[]>([])
let nextId = 0

function dismiss(id: number) {
  toasts.value = toasts.value.filter((toast) => toast.id !== id)
}

// duration en ms ; 0 = reste affiché jusqu'à la fermeture manuelle
function show(message: string, variant: ToastVariant = 'info', duration = 5000) {
  const id = nextId++
  toasts.value.push({ id, variant, message })
  if (duration > 0) setTimeout(() => dismiss(id), duration)
  return id
}

export function useToast() {
  return {
    toasts: readonly(toasts),
    show,
    dismiss,
    info: (message: string, duration?: number) => show(message, 'info', duration),
    success: (message: string, duration?: number) => show(message, 'success', duration),
    error: (message: string, duration?: number) => show(message, 'error', duration),
  }
}
