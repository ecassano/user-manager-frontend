const logout = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
    method: 'POST',
    credentials: 'include',
  })

  const body = await response.json()

  return {
    status: response.status,
    body,
  }
}

export default logout
