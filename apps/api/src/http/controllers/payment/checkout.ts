import type { FastifyReply, FastifyRequest } from 'fastify'
import { MercadoPagoConfig, Payment } from 'mercadopago'
import { randomUUID } from 'node:crypto'
import { z } from 'zod'
import { makeCreatePaymentUseCase } from '../../../use-case/factories/make-create-payment-use-case'
import dotenv from 'dotenv'

dotenv.config()

export async function checkout(request: FastifyRequest, reply: FastifyReply) {
  const checkoutSchema = z.object({
    email: z.string().email(),
    dreamResult: z.object({
      dreamAnalogy: z.string(),
      luckyNumbers: z.array(
        z.object({
          number: z.number(),
          description: z.string(),
        })
      ),
    }),
  })

  const { email, dreamResult } = checkoutSchema.parse(request.body)

  console.log(`[checkout] - ${new Date().toISOString()}`)

  const idempotencyKey = randomUUID().toString()

  const client = new MercadoPagoConfig({
    accessToken:
      (process.env.IS_OFFLINE === 'true'
        ? process.env.MP_ACCESS_TOKEN_DEV
        : process.env.MP_ACCESS_TOKEN) ?? '',
    options: { timeout: 5000, idempotencyKey },
  })

  const payment = new Payment(client)

  const body = {
    transaction_amount: 1.99,
    description: 'Numero dos sonhos',
    payment_method_id: 'pix',
    payer: {
      email,
    },
  }

  const requestOptions = {
    idempotencyKey,
  }

  let paymentResponse: any

  try {
    paymentResponse = await payment.create({ body, requestOptions })
    console.log('[MercadoPago Payment Success]', paymentResponse)
  } catch (error) {
    console.log('[Request Body]', body, requestOptions)
    console.error('[MercadoPago Payment Error]', error)
    return reply.status(500).send({
      error: 'Failed to create payment with MercadoPago',
      details: error instanceof Error ? error.message : 'Unknown error',
    })
  }

  if (!paymentResponse || !paymentResponse.id) {
    return reply.status(500).send({
      error: 'Invalid payment response from MercadoPago',
    })
  }

  const bodyDynamo = {
    paymentId: paymentResponse.id,
    email,
    status: paymentResponse.status,
    timestamp: new Date().toISOString(),
    dreamResult,
    idempotencyKey,
  }

  const createPaymentUseCase = makeCreatePaymentUseCase()

  try {
    await createPaymentUseCase.execute(bodyDynamo)
  } catch (error) {
    console.error('[DynamoDB Error]', error)
    return reply.status(500).send({
      error: 'Failed to save payment to database',
      details: error instanceof Error ? error.message : 'Unknown error',
    })
  }

  return reply.send({
    message: paymentResponse,
  })
}
