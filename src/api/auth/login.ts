const login = async (email: string, password: string) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })

  return response.json()
}

export default login
