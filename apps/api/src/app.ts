import fastify from 'fastify'
import { routes } from './http/controllers/routes'
import fastifySse from 'fastify-sse'
import fastifyCors from '@fastify/cors'
import dotenv from 'dotenv'

declare module 'fastify' {
  interface FastifyReply {
    sse: (data: string | object, options?: Record<string, unknown>) => void
  }
}

dotenv.config()

export const app = fastify()

app.register(fastifyCors, {
  origin: 'http://localhost:8080',
  methods: ['GET', 'POST'],
})

app.register(fastifySse)

routes(app)
