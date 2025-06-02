export type Role = 'admin' | 'user'

export interface User {
  id: string
  name: string
  username: string
  email: string
  password: string
  role: Role
  createdAt: string
  updatedAt: string
}

export interface CreateUser {
  name: string
  email: string
  password: string
}

export interface UpdateProfile {
  name: string
  email: string
  password: string
  updatedAt: string
}
