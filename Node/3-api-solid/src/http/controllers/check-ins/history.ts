import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeFetchUserCheckInsHistoryUseCase } from '@/use-cases/factories/make-fetch-user-check-ins-history-use-case'

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const checkInHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1), // o coruse serve para converter uma string para number
  })

  const { page } = checkInHistoryQuerySchema.parse(request.query)

  try {
    const fetchUserCheckInHistoryUseCase = makeFetchUserCheckInsHistoryUseCase()

    const { checkIns } = await fetchUserCheckInHistoryUseCase.execute({
      userId: request.user.sub,
      page,
    })

    return reply.status(200).send({
      checkIns,
    })
  } catch (err) {
    return reply.status(500).send()
  }
}
