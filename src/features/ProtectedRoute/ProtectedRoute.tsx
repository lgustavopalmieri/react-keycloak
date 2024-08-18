import { Navigate, Outlet } from "react-router-dom"
import Cookies from "js-cookie"

const ProtectedRoute = () => {
  const accessToken = Cookies.get("accessToken")
  if (!accessToken) {
    return <Navigate to="/login" />
  }

  return <Outlet />
}

export default ProtectedRoute
