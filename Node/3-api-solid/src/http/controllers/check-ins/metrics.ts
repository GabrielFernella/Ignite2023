import { FastifyRequest, FastifyReply } from 'fastify'
import { makeGetUserMetricsUseCase } from '@/use-cases/factories/make-get-user-metrics-use-case'

export async function metrics(request: FastifyRequest, reply: FastifyReply) {
  try {
    const fetchUserCheckInHistoryUseCase = makeGetUserMetricsUseCase()

    const { checkInsCount } = await fetchUserCheckInHistoryUseCase.execute({
      userId: request.user.sub,
    })

    return reply.status(200).send({
      checkInsCount,
    })
  } catch (err) {
    return reply.status(500).send()
  }
}
