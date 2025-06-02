import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import me from '../api/auth/me'
import { logout as logoutAction } from '../store/authSlice'
import { setUser } from '../store/userSlice'
import { type RootState } from '../store'
export function ProtectedRoute({ requiredRole }: { requiredRole?: string }) {
  const dispatch = useDispatch()
  const { authenticated, user } = useSelector((state: RootState) => state.auth)
  const location = useLocation()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await me()
        if (!res.authenticated) throw new Error('Não autenticado')

        dispatch(setUser(res.user))
      } catch {
        dispatch(logoutAction())
      } finally {
        setLoading(false)
      }
    }
    checkAuth()
  }, [dispatch])

  if (loading) return <div>Carregando...</div>

  if (!authenticated) {
    // Redireciona para login, guardando a rota original em state
    return <Navigate to="/" state={{ from: location }} replace />
  }

  if (requiredRole && user?.role !== requiredRole) {
    // Redireciona para página de acesso negado ou perfil
    return <Navigate to="/profile" replace />
  }

  return <Outlet />
}
