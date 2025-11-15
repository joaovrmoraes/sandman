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

  const client = new MercadoPagoConfig({
    accessToken:
      (process.env.IS_OFFLINE === 'true'
        ? process.env.MP_ACCESS_TOKEN_DEV
        : process.env.MP_ACCESS_TOKEN) ?? '',
    options: { timeout: 5000, idempotencyKey: 'abc' },
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

  const generatedIdempotencyKey = () => {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`
  }

  const requestOptions = {
    idempotencyKey: generatedIdempotencyKey(),
  }

  let paymentResponse: any

  await payment
    .create({ body, requestOptions })
    .then(response => {
      paymentResponse = response
    })
    .catch(error => {
      console.log(body, requestOptions)
      console.error('[MercadoPago Payment Error]', error)
    })

  const bodyDynamo = {
    paymentId: paymentResponse.id,
    email,
    status: paymentResponse.status,
    timestamp: new Date().toISOString(),
    dreamResult,
  }

  const createPaymentUseCase = makeCreatePaymentUseCase()

  await createPaymentUseCase.execute(bodyDynamo)

  return reply.send({
    message: paymentResponse,
  })
}
