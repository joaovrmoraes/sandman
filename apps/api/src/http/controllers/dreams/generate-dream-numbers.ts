import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { makeGetDreamNumberUseCase } from '../../../use-case/factories/make-get-dream-number-use-case'

export async function generateDreamNumbers(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const generateDreamNumbersSchema = z.object({
    userMessage: z.string().min(1).max(500),
    totalNumber: z.number().optional().default(6),
    numberRange: z.tuple([z.number(), z.number()]).optional().default([1, 60]),
  })

  const { userMessage, totalNumber, numberRange } =
    generateDreamNumbersSchema.parse(request.body)

  const dreamNumbers = makeGetDreamNumberUseCase()
  const response = await dreamNumbers.execute({
    userMessage,
    totalNumber,
    numberRange,
  })

  console.log(`[dreamNumbersPOST] - ${new Date().toISOString()}`)

  return reply.send(response)
}
