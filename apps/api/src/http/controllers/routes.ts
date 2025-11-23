import type { FastifyInstance } from 'fastify'
import { dreamsRoutes } from './dreams/routes'
import { paymentRoutes } from './payment/routes'
import { emailRoutes } from './email/routes'

const clients = new Set()

export async function routes(app: FastifyInstance) {
  app.register(dreamsRoutes, { prefix: '/dreams' })
  app.register(paymentRoutes, { prefix: '/payment' })
  app.register(emailRoutes, { prefix: '/email' })

  app.get('/sse', (request, reply) => {
    const options = {}

    clients.add(reply.raw)

    reply.sse('sample data', options)

    request.raw.on('close', () => {
      clients.delete(reply.raw)
    })
  })
}

export function sendSseData(data: { action: string; data: { id: string } }) {
  for (const client of clients) {
    client.write(`data: ${JSON.stringify(data)}\n\n`)
  }
}
