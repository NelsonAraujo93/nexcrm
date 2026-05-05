// packages/shared/src/index.ts
export type UserRole = 'admin' | 'manager' | 'agent'

export type ContactStatus = 'lead' | 'prospect' | 'customer' | 'churned'

export type DealStage =
  | 'new'
  | 'contacted'
  | 'proposal'
  | 'negotiation'
  | 'won'
  | 'lost'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  isActive: boolean
  createdAt: string
}

export interface Contact {
  id: string
  name: string
  email: string
  phone?: string
  company?: string
  status: ContactStatus
  owner: string
  createdAt: string
}

export interface Deal {
  id: string
  title: string
  value: number
  stage: DealStage
  contact: string
  owner: string
  closingDate?: string
  createdAt: string
}

export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}