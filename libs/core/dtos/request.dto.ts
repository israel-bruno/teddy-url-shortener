import { FastifyRequest } from 'fastify'
import { PayloadDTO } from './payload.dto'

export type RequestDTO = FastifyRequest & { payload: PayloadDTO }
