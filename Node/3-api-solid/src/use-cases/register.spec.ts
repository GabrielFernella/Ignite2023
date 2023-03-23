import { InMemoryUsersRepository } from './../repositories/in-memory/in-memory-users-repository'
import { RegisterUseCase } from '@/use-cases/register'
import { compare } from 'bcryptjs'
import { expect, describe, it, beforeEach } from 'vitest'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'Santos',
      email: 'santos@gmail.com',
      password: '1256754',
    })
    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
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
    const email = 'santos@gmail.com'

    await sut.execute({
      name: 'Santos',
      email,
      password: '1256754',
    })

    await expect(() =>
      sut.execute({
        name: 'Santos',
        email,
        password: '1256754',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
