import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { SearchGymsUseCase } from './search-gyms'

let gymRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Seach Gyms Use Case', () => {
  beforeEach(() => {
    gymRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(gymRepository)
  })

  it('should be able seach for gyms', async () => {
    await gymRepository.create({
      title: 'js academy',
      description: 'Academia de js',
      phone: '11 86585-5854',
      latitude: '-27.209205',
      longitude: '-49.6401091',
    })

    await gymRepository.create({
      title: 'ts academy',
      description: 'Academia de js',
      phone: '11 86585-5854',
      latitude: '-27.209205',
      longitude: '-49.6401091',
    })

    const { gyms } = await sut.execute({
      query: 'js academy',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'js academy' })])
  })

  it('should be able to fetch paginated gym search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymRepository.create({
        title: `ts academy ${i}`,
        description: 'Academia de js',
        phone: '11 86585-5854',
        latitude: '-27.209205',
        longitude: '-49.6401091',
      })
    }

    const { gyms } = await sut.execute({
      query: 'ts academy',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'ts academy 21' }),
      expect.objectContaining({ title: 'ts academy 22' }),
    ])
  })
})
