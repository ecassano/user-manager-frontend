import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import me from '../api/auth/me'
import { setCredentials, logout as logoutAction } from '../store/authSlice'
import { setUser } from '../store/userSlice'

export function AuthVerifier() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const publicPaths = ['/', '/register']

    if (publicPaths.includes(location.pathname)) {
      return
    }

    async function checkAuth() {
      try {
        const response = await me()

        console.log(response)

        if (response.authenticated) {
          dispatch(setUser(response.user))
          dispatch(setCredentials({ authenticated: true, user: response.user }))
        } else {
          dispatch(logoutAction())
          navigate('/')
        }
      } catch (error) {
        console.log(error)
        dispatch(logoutAction())
        navigate('/')
      }
    }

    checkAuth()
  }, [location.pathname, dispatch, navigate])

  return null
}
