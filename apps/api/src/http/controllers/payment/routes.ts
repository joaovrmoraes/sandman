import type { FastifyInstance } from 'fastify'
import { checkout } from './checkout'
import { webhook } from './webhook'

export async function paymentRoutes(app: FastifyInstance) {
  app.post('/checkout', checkout)
  app.post('/webhook', webhook)
}
