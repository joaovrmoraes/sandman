import type { FastifyReply, FastifyRequest } from 'fastify'
import { makeUpdatePaymentUseCase } from '../../../use-case/factories/make-update-payment-use-case'
import { sendSseData } from '../routes'

export async function webhook(request: FastifyRequest, reply: FastifyReply) {
  const { action, data } = request.body as {
    action: string
    data: {
      id: string
    }
  }

  console.log(`[webhook] - ${new Date().toISOString()}`)

  const updatePaymentUseCase = makeUpdatePaymentUseCase()

  if (action === 'payment.updated') {
    try {
      await updatePaymentUseCase.execute({
        paymentId: Number(data?.id),
        status: 'paid',
      })

      sendSseData({ action, data })
    } catch (error) {
      console.log('Error updating payment', error)
    }

    console.log(
      `[webhook] - Payment updated: ${data.id} at ${new Date().toISOString()}`
    )
  }

  return reply.send({
    message: 'webhook',
  })
}
//23c591af24bbc0b86fb3874666872d3d34c9951a01deff11059cedbbd832a671
