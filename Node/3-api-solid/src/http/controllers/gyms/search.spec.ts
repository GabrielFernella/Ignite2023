import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '@/app'
import request from 'supertest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Search Gyms (e2e)', () => {
  beforeAll(async () => {
    await app.ready() // para saber se a aplicação terminou de ser inicializada
  })

  afterAll(async () => {
    await app.close() // encerar aplicação
  })

  it('Should be able to Search Gym', async () => {
    const { token } = await createAndAuthenticateUser(app)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'javascript academy',
        description: 'SomeDescription',
        phone: '11 89585254',
        latitude: -27.209205,
        longitude: -49.6401091,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'typescript academy',
        description: 'SomeDescription',
        phone: '11 89585254',
        latitude: -27.209205,
        longitude: -49.6401091,
      })

    const response = await request(app.server)
      .get('/gyms/search')
      .set('Authorization', `Bearer ${token}`)
      .query({
        q: 'javascript',
      })
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'javascript academy',
      }),
    ])
  })
})
