const deleteUser = async (id: string) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${id}`, {
    method: 'DELETE',
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

export default deleteUser
