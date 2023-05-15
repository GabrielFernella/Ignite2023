import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

// run test: npm run test:e2e --

describe('Register (e2e)', () => {
  beforeAll(async () => {
    await app.ready() // para saber se a aplicação terminou de ser inicializada
  })

  afterAll(async () => {
    await app.close() // encerar aplicação
  })

  it('Should be able to register', async () => {
    const response = await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '123456',
    })

    expect(response.statusCode).toEqual(201)
  })
})
