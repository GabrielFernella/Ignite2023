import { randomUUID } from 'node:crypto'
import { CheckInUseCase } from './check-in'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-in-repository'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

let checkInRepository: InMemoryCheckInsRepository
let sut: CheckInUseCase

describe('Checkin ', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInsRepository()
    sut = new CheckInUseCase(checkInRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('Should be able create check-in', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
    const { checkIn } = await sut.execute({
      gymId: randomUUID(),
      userId: randomUUID(),
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('Should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: randomUUID(),
      userId: 'user_id',
    })

    await expect(() =>
      sut.execute({
        gymId: randomUUID(),
        userId: 'user_id',
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('Should be able to check in twice but in diferrent days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: randomUUID(),
      userId: 'user_id',
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: randomUUID(),
      userId: 'user_id',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
