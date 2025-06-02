import type { Role } from '../types/user'

export const roleMap = {
  admin: 'Admin',
  user: 'Usuário',
} as const

export type ReadableRole = (typeof roleMap)[Role]
