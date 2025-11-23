import type { PaymentModel } from '../models/payment-model'

export interface PaymentRepository {
  create({
    dreamResult,
    email,
    paymentId,
    status,
    timestamp,
    idempotencyKey,
  }: PaymentModel): Promise<void>
  updateStatus({
    paymentId,
    status,
  }: { paymentId: number; status: string }): Promise<void>
  findByPaymentId(paymentId: number): Promise<PaymentModel | null>
}
