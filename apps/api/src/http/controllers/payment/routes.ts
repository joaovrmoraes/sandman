import type { FastifyInstance } from 'fastify'
import { checkout } from './checkout'
import { webhook } from './webhook'
import { checkStatus } from './check-status'

export async function paymentRoutes(app: FastifyInstance) {
  app.post('/checkout', checkout)
  app.post('/webhook', webhook)
  app.get('/status/:paymentId', checkStatus)
}
