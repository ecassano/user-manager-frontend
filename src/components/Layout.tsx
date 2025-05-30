import { Outlet } from "react-router-dom"
export const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:dark-background">
      <header className="bg-gray-200 text-center p-2 text-sm text-gray-500">
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