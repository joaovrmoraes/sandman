import type { EmailRepository } from '../repositories/email-repository'
import type { PaymentRepository } from '../repositories/payment-repository'

interface SendDreamEmailUseCaseRequest {
  paymentId: number
}

export class SendDreamEmailUseCase {
  constructor(
    private paymentRepository: PaymentRepository,
    private emailRepository: EmailRepository,
  ) {}

  async execute({ paymentId }: SendDreamEmailUseCaseRequest): Promise<void> {
    const payment = await this.paymentRepository.findByPaymentId(paymentId)

    if (!payment) {
      throw new Error(`Payment ${paymentId} not found`)
    }

    if (payment.status !== 'paid') {
      console.log(`[SendDreamEmail] Payment ${paymentId} is not paid yet`)
      return
    }

    await this.emailRepository.sendDreamResult(
      payment.email,
      payment.dreamResult,
    )

    console.log(`[SendDreamEmail] Email sent to ${payment.email} for payment ${paymentId}`)
  }
}
