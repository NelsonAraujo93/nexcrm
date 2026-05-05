import { Request, Response, NextFunction } from 'express'
import { sendError } from './response'

export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500,
    public isOperational: boolean = true
  ) {
    super(message)
    Object.setPrototypeOf(this, AppError.prototype)
  }
}

export const errorHandler = (
  err: Error | AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
): Response => {
  if (err instanceof AppError) {
    return sendError(res, err.message, err.statusCode)
  }

  // Unexpected errors — don't leak details to client
  console.error('Unexpected error:', err)
  return sendError(res, 'Internal server error', 500)
}