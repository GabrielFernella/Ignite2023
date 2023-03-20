import { InMemoryUsersRepository } from './../repositories/in-memory/in-memory-users-repository'
import { RegisterUseCase } from '@/use-cases/register'
import { compare } from 'bcryptjs'
import { expect, describe, it } from 'vitest'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

describe('Register Use Case', () => {
  it('should be able to register', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const { user } = await registerUseCase.execute({
      name: 'Santos',
      email: 'santos@gmail.com',
      password: '1256754',
    })
    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const { user } = await registerUseCase.execute({
      name: 'Santos',
      email: 'santos@gmail.com',
      password: '1256754',
    })

    const isPasswordCorrectlyHashed = await compare(
      '1256754',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const email = 'santos@gmail.com'

    await registerUseCase.execute({
      name: 'Santos',
      email,
      password: '1256754',
    })

    expect(() =>
      registerUseCase.execute({
        name: 'Santos',
        email,
        password: '1256754',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
