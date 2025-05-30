import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Layout } from "../components/Layout"
import Login from "../pages/Login"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Login /> },
      // { path: "/register", element: <Register /> },
      // { path: "/profile", element: <Profile /> },
      // { path: "/admin/users", element: <Dashboard /> },
    ]
  }
])

export const AppRoutes = () => {
  return <RouterProvider router={router} />
}