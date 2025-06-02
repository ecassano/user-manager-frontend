const getAllUsers = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
    credentials: 'include',
  })

  const body = await response.json()

  return {
    status: response.status,
    body,
  }
}
export default getAllUsers
