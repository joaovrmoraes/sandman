import type { PaymentRepository } from '../repositories/payment-repository'

export class UpdatePaymentUseCase {
  constructor(private paymentRepository: PaymentRepository) {}

  async execute({
    paymentId,
    status,
  }: { paymentId: number; status: string }): Promise<void> {
    await this.paymentRepository.updateStatus({
      paymentId,
      status,
    })

    console.log(`[update-payment] - ${new Date().toISOString()}`)

    return
  }
}
