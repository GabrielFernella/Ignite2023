import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeSearchGymsUseCase } from '@/use-cases/factories/make-search-gyms-use-case'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchGymsQuery = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1), // o coruse serve para converter uma string para number
  })

  const { query, page } = searchGymsQuery.parse(request.query)

  try {
    const searchGymUseCase = makeSearchGymsUseCase()

    const gyms = await searchGymUseCase.execute({
      query,
      page,
    })

    return reply.status(201).send({
      gyms,
    })
  } catch (err) {
    return reply.status(500).send()
  }
}
