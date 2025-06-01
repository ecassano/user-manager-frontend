import type { CreateUser } from '@/types/user'

const createUser = async (user: CreateUser) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/auth/register`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    }
  )

  const body = await response.json()

  return {
    status: response.status,
    body,
  }
}

export default createUser
