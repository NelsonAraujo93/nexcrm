import mongoose from 'mongoose'
import { env } from './env'

const MONGOOSE_OPTIONS = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
}

export const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(env.MONGODB_URI, MONGOOSE_OPTIONS)
    console.log(`✅ MongoDB connected: ${conn.connection.host}`)
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error)
    process.exit(1)
  }
}

export const disconnectDB = async (): Promise<void> => {
  await mongoose.disconnect()
  console.log('MongoDB disconnected')
}