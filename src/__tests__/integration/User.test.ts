import request from 'supertest'
import { getConnection } from 'typeorm'
import { v4 as uuid } from 'uuid'

import { app } from '../../app'
import createConnection from '../../db'

describe('Users', () => {
  beforeAll(async() => {
    const conn = await createConnection()
    await conn.runMigrations()
  })

  afterAll(async() => {
    const conn = getConnection()
    await conn.dropDatabase()
    await conn.close()
  })
  
  // STORE
  
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
  
  it('Should not be able to create a new user with a invalid email', async() => {
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
  
  // INDEX
  
  it('Should be able to get all users', async() => {
    await request(app).post('/users').send({
      name: 'user2',
      email: 'user2@email.com'
    })
    
    const resp = await request(app).get('/users')
    expect(resp.body.length).toBe(2)
  })

  // SHOW
  
  it('Should be able to get a user', async() => {
    const { body: { id } } = await request(app).post('/users').send({
      name: 'user3',
      email: 'user3@email.com'
    })
      
    const resp = await request(app).get(`/users/${id}`)  
    expect(resp.status).toBe(200)
  })
  
  it('Should not be able to get a user with a not registered id', async() => {
    const resp = await request(app).get(`/users/${uuid()}`)  
    expect(resp.status).toBe(404)
  })

  // UPDATE
  
  it('Should be able to update a user', async() => {
    const { body: { id } } = await request(app).post('/users').send({
      name: 'user4',
      email: 'user4@email.com'
    })
      
    const resp = await request(app).put(`/users/${id}`).send({
      name: 'user5',
      email: 'user5@email.com'
    })
  
    expect(resp.status).toBe(200)
  })
  
  it('Should not be able to update a user with exists email', async() => {
    const { body: { id } } = await request(app).post('/users').send({
      name: 'user6',
      email: 'user6@email.com'
    })
      
    const resp = await request(app).put(`/users/${id}`).send({
      name: 'user5',
      email: 'user5@email.com'
    })
  
    expect(resp.status).toBe(400)
  })
    
  it('Should not be able to update a user with a not registered id', async() => {
    const resp = await request(app).put(`/users/${uuid()}`).send({
      name: 'user7',
      email: 'user7@email.com'
    })
  
    expect(resp.status).toBe(404)
  })
    
  // DELETE
  
  it('Should be able to delete a user', async() => {
    const { body: { id } } = await request(app).post('/users').send({
      name: 'user8',
      email: 'user8@email.com'
    })
    
    const resp = await request(app).delete(`/users/${id}`)  
    expect(resp.status).toBe(200)
  })
  
  it('Should not be able to delete a user with a not registered id', async() => {
    const resp = await request(app).delete(`/users/${uuid()}`)  
    expect(resp.status).toBe(404)
  })
})
