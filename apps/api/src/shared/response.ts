import { Response } from 'express'
import { ApiResponse, PaginatedResponse } from '@nexcrm/shared'

export const sendSuccess = <T>(
  res: Response,
  data: T,
  statusCode = 200,
  message?: string
): Response => {
  const response: ApiResponse<T> = {
    success: true,
    data,
    ...(message && { message }),
  }
  return res.status(statusCode).json(response)
}

export const sendError = (
  res: Response,
  message: string,
  statusCode = 500
): Response => {
  const response: ApiResponse<null> = {
    success: false,
    data: null,
    message,
  }
  return res.status(statusCode).json(response)
}

export const sendPaginated = <T>(
  res: Response,
  data: T[],
  pagination: PaginatedResponse<T>['pagination']
): Response => {
  const response: PaginatedResponse<T> = {
    success: true,
    data,
    pagination,
  }
  return res.status(200).json(response)
}