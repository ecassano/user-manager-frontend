import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Button } from './ui/button'
import { SignOut } from 'phosphor-react'
import { type RootState } from '../store'
import { useDispatch } from "react-redux";
import logout from '../api/logout'
import { logout as logoutAction } from '../store/authSlice'
export function Logout() {
  const navigate = useNavigate()
  const { authenticated, user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    const response = await logout();
    console.log(response);
    if (response.status === 201) {
      dispatch(logoutAction())
      navigate('/login')
    }
  }

  console.log(user?.name);

  if (!authenticated) {
    return (
      <span className="text-sm font-medium text-muted-100">
        Plataforma de gerenciamento de usuários
      </span>
    )
  }

  return (
    <div className="flex items-center gap-1">
      <span className="text-sm text-muted-100">
        Olá, <strong>{user?.name}</strong>
      </span>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleLogout}
        className="flex items-center gap-1 cursor-pointer text-muted-100 hover:bg-transparent hover:text-primary-500"
      >
        <SignOut className="w-4 h-4" />
        Sair
      </Button>
    </div>
  )
}
