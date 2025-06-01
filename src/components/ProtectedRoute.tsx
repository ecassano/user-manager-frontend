import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import type { RootState } from '../store/index'

type Props = {
  requiredRole?: 'admin' | 'user'
}

export const ProtectedRoute = ({ requiredRole }: Props) => {
  const { authenticated, user } = useSelector((state: RootState) => state.auth)

  if (!authenticated) return <Navigate to="/" replace />
  if (requiredRole && user?.role !== requiredRole) return <Navigate to="/unauthorized" replace />

  return <Outlet />
}
