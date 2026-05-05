// apps/api/src/index.ts
import dotenv from 'dotenv'
dotenv.config()

import express, { Application } from 'express'
import cors from 'cors'
import { connectDB } from './config/db'
import { env } from './config/env'
import { errorHandler } from './shared/errorHandler'
import { sendSuccess } from './shared/response'

const app: Application = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/health', (_req, res) => {
  sendSuccess(res, {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: env.NODE_ENV,
  })
})

// Global error handler — must be last
app.use(errorHandler)

const start = async (): Promise<void> => {
  await connectDB()
  app.listen(env.PORT, () => {
    console.log(`🚀 NexCRM API running on http://localhost:${env.PORT}`)
    console.log(`📦 Environment: ${env.NODE_ENV}`)
  })
}

if (require.main === module) {
  start()
}

export default app