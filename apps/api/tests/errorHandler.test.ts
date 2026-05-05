import { Request, Response, NextFunction } from 'express'
import { AppError, errorHandler } from '../src/shared/errorHandler'

const mockRes = () => {
  const res = {} as Response
  res.status = jest.fn().mockReturnValue(res)
  res.json = jest.fn().mockReturnValue(res)
  return res
}

const mockReq = {} as Request
const mockNext = jest.fn() as NextFunction

describe('AppError', () => {
  it('sets message and default statusCode', () => {
    const err = new AppError('Bad request', 400)
    expect(err.message).toBe('Bad request')
    expect(err.statusCode).toBe(400)
    expect(err.isOperational).toBe(true)
    expect(err instanceof Error).toBe(true)
  })

  it('defaults statusCode to 500', () => {
    const err = new AppError('Oops')
    expect(err.statusCode).toBe(500)
  })
})

describe('errorHandler', () => {
  it('returns AppError statusCode and message', () => {
    const res = mockRes()
    const err = new AppError('Not found', 404)
    errorHandler(err, mockReq, res, mockNext)
    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: 'Not found' }))
  })

  it('returns 500 for unexpected errors', () => {
    const res = mockRes()
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
    errorHandler(new Error('crash'), mockReq, res, mockNext)
    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: 'Internal server error' }))
    consoleSpy.mockRestore()
  })
})
