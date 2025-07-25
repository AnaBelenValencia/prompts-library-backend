import request from 'supertest'
import mongoose from 'mongoose'
import app from '../app.js'
import Prompt from '../models/Prompt.js'
import { jest } from '@jest/globals'

const testPrompt = {
  title: 'Test Prompt',
  content: 'This is a test prompt.',
  tags: ['test'],
  status: 'active',
}

let createdId

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI, {
    dbName: 'promptdb_test',
  })
})

afterAll(async () => {
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
})

describe('Prompt API', () => {
  it('should create a prompt', async () => {
    const res = await request(app).post('/prompts').send(testPrompt)
    expect(res.statusCode).toBe(201)
    expect(res.body).toHaveProperty('id')
    createdId = res.body.id
  })

  it('should retrieve all prompts', async () => {
    const res = await request(app).get('/prompts')
    expect(res.statusCode).toBe(200)
    expect(res.body.length).toBeGreaterThan(0)
  })

  it('should retrieve a prompt by ID', async () => {
    const res = await request(app).get(`/prompts/${createdId}`)
    expect(res.statusCode).toBe(200)
    expect(res.body.title).toBe(testPrompt.title)
  })

  it('should update a prompt status', async () => {
    const res = await request(app)
      .patch(`/prompts/${createdId}`)
      .send({ status: 'inactive' })
    expect(res.statusCode).toBe(200)
    expect(res.body.status).toBe('inactive')
  })
})
