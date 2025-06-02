const getProfile = async (id: string) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${id}`, {
    credentials: 'include',
  })
  const data = await response.json()
  return data
}

export default getProfile
