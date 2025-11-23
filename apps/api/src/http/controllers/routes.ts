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
    // Configura headers SSE
    reply.raw.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*',
    })

    // Adiciona cliente
    clients.add(reply.raw)
    console.log(`[SSE] Cliente conectado. Total: ${clients.size}`)

    // Envia comentário inicial para manter conexão
    reply.raw.write(':ok\n\n')

    // Heartbeat a cada 30s para manter conexão viva
    const heartbeat = setInterval(() => {
      reply.raw.write(':ping\n\n')
    }, 30000)

    // Remove cliente quando desconectar
    request.raw.on('close', () => {
      clearInterval(heartbeat)
      clients.delete(reply.raw)
      console.log(`[SSE] Cliente desconectado. Total: ${clients.size}`)
    })
  })
}

export function sendSseData(data: { action: string; data: { id: string } }) {
  console.log(`[SSE] Enviando para ${clients.size} clientes:`, data)
  for (const client of clients) {
    try {
      client.write(`data: ${JSON.stringify(data)}\n\n`)
    } catch (error) {
      console.error('[SSE] Erro ao enviar para cliente:', error)
      clients.delete(client)
    }
  }
}
