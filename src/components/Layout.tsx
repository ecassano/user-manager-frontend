import { Outlet } from "react-router-dom"
import logo from "../assets/logo-conectar.svg"
import { Logout } from "./Logout"
import { AuthVerifier } from "./AuthVerifier"
export const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-muted-500 shadow-2xs">
        <div className="max-w-6xl mx-auto w-full flex items-center justify-between p-4">
          <img src={logo} alt="logo" className="w-28 h-14" />
          <Logout />
        </div>
      </header>
      <main className="flex-1">
        <div className="max-w-6xl mx-auto w-full">
          <AuthVerifier />
          <Outlet />
        </div>
      </main>
      <footer className="bg-gray-200 text-center p-2 text-sm text-gray-500">
        © 2025 User Manager
      </footer>
    </div>
  )
}