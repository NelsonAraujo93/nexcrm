import request from 'supertest'
import app from '../src/index'
import { connectDB, disconnectDB } from '../src/config/db'

describe('Health endpoint', () => {
  beforeAll(async () => {
    await connectDB()
  })

  afterAll(async () => {
    await disconnectDB()
  })

  it('GET /health returns 200 with correct shape', async () => {
    const res = await request(app).get('/health')

    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
    expect(res.body.data).toHaveProperty('status', 'healthy')
    expect(res.body.data).toHaveProperty('timestamp')
    expect(res.body.data).toHaveProperty('environment')
  })
})