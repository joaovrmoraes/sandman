import type { PaymentRepository } from '../repositories/payment-repository'
import type { PaymentModel } from '../models/payment-model'

export class CreatePaymentUseCase {
  constructor(private paymentRepository: PaymentRepository) {}

  async execute({
    dreamResult,
    email,
    paymentId,
    status,
    timestamp,
  }: PaymentModel): Promise<void> {
    await this.paymentRepository.create({
      dreamResult,
      email,
      paymentId,
      status,
      timestamp,
    })

    console.log(`[create-payment] - ${new Date().toISOString()}`)

    return
  }
}
