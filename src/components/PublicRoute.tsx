import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import type { RootState } from '../store/index'

export const PublicRoute = () => {
  const { authenticated, user } = useSelector((state: RootState) => state.auth)

  if (authenticated) {
    if (user?.role === 'admin') {
      return <Navigate to="/admin/users" replace />
    } else {
      return <Navigate to="/profile" replace />
    }
  }

  return <Outlet />
}
