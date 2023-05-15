import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '@/app'
import request from 'supertest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Profile (e2e)', () => {
  beforeAll(async () => {
    await app.ready() // para saber se a aplicação terminou de ser inicializada
  })

  afterAll(async () => {
    await app.close() // encerar aplicação
  })

  it('Should be able to get user Profile', async () => {
    // create account
    /* await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '123456',
    })

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'john@gmail.com',
      password: '123456',
    })

    const { token } = authResponse.body */

    const { token } = await createAndAuthenticateUser(app)

    const profileResponse = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(profileResponse.statusCode).toEqual(200)
    expect(profileResponse.body).toEqual(
      expect.objectContaining({
        email: 'john@gmail.com',
      }),
    )
  })
})
