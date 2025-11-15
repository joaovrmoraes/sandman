import type { FastifyInstance } from 'fastify'
import { dreamsRoutes } from './dreams/routes'
import { paymentRoutes } from './payment/routes'

const clients = new Set()

export async function routes(app: FastifyInstance) {
  app.register(dreamsRoutes, { prefix: '/dreams' })
  app.register(paymentRoutes, { prefix: '/payment' })

  app.get('/sse', (request, reply) => {
    const options = {}

    clients.add(reply.raw)

    reply.sse('sample data', options)

    request.raw.on('close', () => {
      clients.delete(reply.raw)
    })
    // const interval = setInterval(() => {
    //   console.log('sending data', index)
    //   reply.sse({ event: 'test', data: index })
    //   index++
    //   if (index === 10) {
    //     reply.sse('closing connection')
    //     clearInterval(interval)
    //   }
    // }, 1000)
  })
}

export function sendSseData(data) {
  for (const client of clients) {
    client.write(`data: ${JSON.stringify(data)}\n\n`)
  }
}
