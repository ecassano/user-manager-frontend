import { Outlet } from "react-router-dom"
import logo from "../assets/logo-conectar.svg"

export const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="flex items-center justify-center bg-muted-700 shadow-2xs text-center p-2 text-sm text-gray-500">
        <img src={logo} alt="logo" className="w-36 h-18" />
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="bg-gray-200 text-center p-2 text-sm text-gray-500">
        © 2025 User Manager
      </footer>
    </div>
  )
}