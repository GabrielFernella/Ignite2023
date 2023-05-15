import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '@/app'
import request from 'supertest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Create Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready() // para saber se a aplicação terminou de ser inicializada
  })

  afterAll(async () => {
    await app.close() // encerar aplicação
  })

  it('Should be able to Create Gym', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const response = await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'javascript academy',
        description: 'SomeDescription',
        phone: '11 89585254',
        latitude: -27.209205,
        longitude: -49.6401091,
      })

    expect(response.statusCode).toEqual(201)
  })
})
