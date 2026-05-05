interface EnvConfig {
  PORT: number
  MONGODB_URI: string
  JWT_SECRET: string
  JWT_REFRESH_SECRET: string
  JWT_EXPIRES_IN: string
  JWT_REFRESH_EXPIRES_IN: string
  NODE_ENV: 'development' | 'production' | 'test'
}

const requireEnv = (key: string): string => {
  const value = process.env[key]
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`)
  }
  return value
}

const loadEnvConfig = (): EnvConfig => {
  return {
    PORT: parseInt(process.env.PORT ?? '3001', 10),
    MONGODB_URI: requireEnv('MONGODB_URI'),
    JWT_SECRET: requireEnv('JWT_SECRET'),
    JWT_REFRESH_SECRET: requireEnv('JWT_REFRESH_SECRET'),
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN ?? '15m',
    JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN ?? '7d',
    NODE_ENV: (process.env.NODE_ENV as EnvConfig['NODE_ENV']) ?? 'development',
  }
}

export const env = loadEnvConfig()