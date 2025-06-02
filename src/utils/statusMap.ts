export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export const statusMap = {
  [UserStatus.ACTIVE]: 'Ativo',
  [UserStatus.INACTIVE]: 'Inativo',
} as const

export type Status = keyof typeof statusMap
