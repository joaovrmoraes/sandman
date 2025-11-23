import type { FastifyInstance } from 'fastify'
import { testEmail } from './test-email'

export async function emailRoutes(app: FastifyInstance) {
  app.post('/test-email', testEmail)
}
