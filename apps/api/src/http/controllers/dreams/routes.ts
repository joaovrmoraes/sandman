import type { FastifyInstance } from 'fastify'
import { generateDreamNumbers } from './generate-dream-numbers'

export async function dreamsRoutes(app: FastifyInstance) {
  app.post('/numbers', generateDreamNumbers)
}
