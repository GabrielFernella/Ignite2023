import { InvalidCredentialsError } from './../../use-cases/errors/invalid-credentials-error'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { AuthenticateUseCase } from '@/use-cases/authenticate'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = registerBodySchema.parse(request.body)

  try {
    const usersRepository = new PrismaUsersRepository()
    const authenticateUseCase = new AuthenticateUseCase(usersRepository)

    await authenticateUseCase.execute({
      email,
      password,
    })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message })
    }
    return reply.status(500).send()
  }

  return reply.status(200).send()
}