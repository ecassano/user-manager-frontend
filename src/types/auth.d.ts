import type { User } from './user'

interface AuthState {
  authenticated: boolean
  user: User | null
}
