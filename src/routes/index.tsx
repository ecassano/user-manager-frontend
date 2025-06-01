import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Layout } from "../components/Layout"
import Login from "../pages/Login"
import Register from "../pages/Register"
import Profile from "../pages/Profile"
import Dashboard from "../pages/Dashboard"
import { ProtectedRoute } from "../components/ProtectedRoute"
import { PublicRoute } from "../components/PublicRoute"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        element: <PublicRoute />,
        children: [
          { index: true, element: <Login /> },
          { path: "/register", element: <Register /> },
        ]
      },
      {
        element: <ProtectedRoute />,
        children: [
          { path: "/profile", element: <Profile /> },
        ]
      },
      {
        element: <ProtectedRoute requiredRole="admin" />, children: [
          { path: "/admin/users", element: <Dashboard /> },
        ]
      },
      // { path: "/unauthorized", element: <Unauthorized /> },
    ]
  }
])

export const AppRoutes = () => {
  return <RouterProvider router={router} />
}