import { Response } from 'express'
import { sendSuccess, sendError, sendPaginated } from '../src/shared/response'

const mockRes = () => {
  const res = {} as Response
  res.status = jest.fn().mockReturnValue(res)
  res.json = jest.fn().mockReturnValue(res)
  return res
}

describe('response helpers', () => {
  describe('sendSuccess', () => {
    it('returns 200 with success shape', () => {
      const res = mockRes()
      sendSuccess(res, { id: 1 })
      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith({ success: true, data: { id: 1 } })
    })

    it('includes message when provided', () => {
      const res = mockRes()
      sendSuccess(res, null, 201, 'Created')
      expect(res.status).toHaveBeenCalledWith(201)
      expect(res.json).toHaveBeenCalledWith({ success: true, data: null, message: 'Created' })
    })
  })

  describe('sendError', () => {
    it('returns 500 with error shape by default', () => {
      const res = mockRes()
      sendError(res, 'Something went wrong')
      expect(res.status).toHaveBeenCalledWith(500)
      expect(res.json).toHaveBeenCalledWith({ success: false, data: null, message: 'Something went wrong' })
    })

    it('uses provided status code', () => {
      const res = mockRes()
      sendError(res, 'Not found', 404)
      expect(res.status).toHaveBeenCalledWith(404)
    })
  })

  describe('sendPaginated', () => {
    it('returns 200 with paginated shape', () => {
      const res = mockRes()
      const pagination = { page: 1, limit: 10, total: 2, totalPages: 1 }
      sendPaginated(res, [1, 2], pagination)
      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith({ success: true, data: [1, 2], pagination })
    })
  })
})
