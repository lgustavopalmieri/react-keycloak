import React from "react"
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom"
import Login from "./features/Login/Login"
import Callback from "./features/Callback"
import Logout from "./features/Logout/Logout"

type Props = {}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<div>home page</div>} />
      <Route path="/login" element={<Login />} />
      <Route path="/callback" element={<Callback />} />
      <Route path="/logout" element={<Logout />} />
    </Route>,
  ),
)

function Routes() {
  return <RouterProvider router={router} />
}

export default Routes
