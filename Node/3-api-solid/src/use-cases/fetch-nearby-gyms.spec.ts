import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let gymRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(() => {
    gymRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymRepository)
  })

  it('should be able fetch nearby gyms', async () => {
    await gymRepository.create({
      title: 'Near Gym',
      description: 'Academia de js',
      phone: '11 86585-5854',
      latitude: '-27.209205',
      longitude: '-49.6401091',
    })

    // Academia distante
    await gymRepository.create({
      title: 'Far Gym',
      description: 'Academia de js',
      phone: '11 86585-5854',
      latitude: '-27.0610928',
      longitude: '-49.5229501',
    })

    const { gyms } = await sut.execute({
      userLatitude: -27.209205,
      userLongitude: -49.6401091,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })
})
