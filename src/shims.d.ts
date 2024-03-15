import type { MessageApiInjection } from 'naive-ui'

declare global {
  interface Window {
    $message: MessageApiInjection
  }
}
