import type { FastifyReply, FastifyRequest } from 'fastify'
import { makeCheckPaymentStatusUseCase } from '../../../use-case/factories/make-check-payment-status-use-case'

interface CheckStatusParams {
  paymentId: string
}

export async function checkStatus(
  request: FastifyRequest<{ Params: CheckStatusParams }>,
  reply: FastifyReply
) {
  try {
    const { paymentId } = request.params

    const checkPaymentStatusUseCase = makeCheckPaymentStatusUseCase()
    const result = await checkPaymentStatusUseCase.execute({
      paymentId: Number(paymentId),
    })

    return reply.status(200).send(result)
  } catch (error) {
    console.error('[CheckStatus] Error:', error)

    if (error instanceof Error && error.message === 'Payment not found') {
      return reply.status(404).send({
        error: 'Payment not found',
      })
    }

    return reply.status(500).send({
      error: 'Internal server error',
    })
  }
}
