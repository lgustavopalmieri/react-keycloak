// src/features/auth/Logout.js
import React from "react"
import { useDispatch } from "react-redux"
import Cookies from "js-cookie"
import { makeLogout } from "../../authFlow/authorizationFlow"

const Logout = () => {
  const dispatch = useDispatch()

  const handleLogout = () => {
    makeLogout()
  }

  return <button onClick={handleLogout}>Logout</button>
}

export default Logout
