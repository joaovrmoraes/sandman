import type { DreamModel } from './dream-model'

export interface PaymentModel {
  paymentId: number
  email: string
  status: string
  timestamp: string
  dreamResult: DreamModel
}
