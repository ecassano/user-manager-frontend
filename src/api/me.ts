import type { Role } from '@/types/user'

interface MeResponse {
  authenticated: boolean
  user: {
    id: string
    email: string
    role: Role
    name: string
  } | null
}

const me = async (): Promise<MeResponse> => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
    credentials: 'include',
  })

  if (!response.ok) {
    return {
      authenticated: false,
      user: null,
    }
  }

  return response.json()
}

export default me
