import type { FastifyReply, FastifyRequest } from 'fastify'
import { makeSendDreamEmailUseCase } from '../../../use-case/factories/make-send-dream-email-use-case'
import { z } from 'zod'

const testEmailSchema = z.object({
  paymentId: z.number(),
})

export async function testEmail(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { paymentId } = testEmailSchema.parse(request.body)

    const sendDreamEmailUseCase = makeSendDreamEmailUseCase()
    
    await sendDreamEmailUseCase.execute({ paymentId })

    return reply.status(200).send({
      success: true,
      message: `Email enviado para o pagamento ${paymentId}`,
    })
  } catch (error) {
    console.error('[TestEmail] Error:', error)
    
    return reply.status(500).send({
      success: false,
      error: error instanceof Error ? error.message : 'Erro ao enviar email',
    })
  }
}
