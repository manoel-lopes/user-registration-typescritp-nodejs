import request from 'supertest'
import { app } from '../app'

import createConnection from '../db'

describe('Users', () => {
  beforeAll(async() => {
    const conn = await createConnection()
    await conn.runMigrations()
  })

  it('Should not be able to create a new user without pass name', async() => {
    const resp = await request(app).post('/users').send({
      email: 'user@email.com'
    })

    expect(resp.status).toBe(400)
  })

  it('Should not be able to create a new user without pass email', async() => {
    const resp = await request(app).post('/users').send({
      name: 'user'
    })

    expect(resp.status).toBe(400)
  })

  it('Should not be able to create a new user with a not valid email', async() => {
    const resp = await request(app).post('/users').send({
      name: 'user',
      email: 'useremail'
    })

    expect(resp.status).toBe(400)
  })

  it('Should be able to create a new user', async() => {
    const resp = await request(app).post('/users').send({
      name: 'user',
      email: 'user@email.com'
    })

    expect(resp.status).toBe(201)
  })
  
  it('Should not be able to create a new user with exists email', async() => {
    const resp = await request(app).post('/users').send({
      name: 'user',
      email: 'user@email.com'
    })

    expect(resp.status).toBe(400)
  })
})
