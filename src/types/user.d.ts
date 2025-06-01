export type Role = 'admin' | 'user'

export interface User {
  id: string
  name: string
  username: string
  email: string
  password: string
  role: Role
}

export interface CreateUser {
  name: string
  email: string
  password: string
}
