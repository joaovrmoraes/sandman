import type { PaymentRepository } from '../repositories/payment-repository'

export class CheckPaymentStatusUseCase {
  constructor(private paymentRepository: PaymentRepository) {}

  async execute({ paymentId }: { paymentId: number }): Promise<{
    status: string
    paid: boolean
  }> {
    const payment = await this.paymentRepository.findByPaymentId(paymentId)

    if (!payment) {
      throw new Error('Payment not found')
    }

    return {
      status: payment.status,
      paid: payment.status === 'paid',
    }
  }
}
