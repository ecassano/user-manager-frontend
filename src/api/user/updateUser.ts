import type { UpdateProfile } from '../../types/user'

const updateUser = async (userId: string, data: UpdateProfile) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/users/${userId}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data),
    }
  )

  return {
    status: response.status,
    body: await response.json(),
  }
}

export default updateUser
