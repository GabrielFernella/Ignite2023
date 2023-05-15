import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '@/app'
import request from 'supertest'

describe('Authenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready() // para saber se a aplicação terminou de ser inicializada
  })

  afterAll(async () => {
    await app.close() // encerar aplicação
  })

  it('Should be able to authenticate', async () => {
    // create account
    await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '123456',
    })

    const response = await request(app.server).post('/sessions').send({
      email: 'john@gmail.com',
      password: '123456',
    })

    console.log(response)

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})
