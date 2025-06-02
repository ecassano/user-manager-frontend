import type { UpdateProfile } from '@/types/user'

const updateProfile = async (id: string, data: UpdateProfile) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })

  const body = await response.json()

  return {
    status: response.status,
    body,
  }
}

export default updateProfile
