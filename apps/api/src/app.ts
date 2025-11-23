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
  origin: (origin, cb) => {
    const allowed = [
      "http://localhost:8080",
      "https://numerodossonhos.com.br",
    ];

    // requisições internas (ex: server-side) não têm origin
    if (!origin) return cb(null, true);

    if (allowed.includes(origin)) {
      return cb(null, true);
    }

    return cb(new Error("Not Allowed"), false);
  },
  methods: ["GET", "POST"],
})

app.register(fastifySse)

routes(app)
