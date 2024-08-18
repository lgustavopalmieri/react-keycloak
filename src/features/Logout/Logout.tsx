// src/features/auth/Logout.js
import React from "react"
import { useDispatch } from "react-redux"
import Cookies from "js-cookie"
import { makeLogout } from "../../authFlow/authorizationFlow"
import { setIsAuthenticated, setTokens } from "../api/authSlice"

const Logout = () => {
  const dispatch = useDispatch()

  const handleLogout = () => {
    makeLogout()
    dispatch(
      setTokens({
        accessToken: "",
        refreshToken: "",
        idToken: "",
      }),
      dispatch(setIsAuthenticated(false)),
    )
  }

  return <button onClick={handleLogout}>Logout</button>
}

export default Logout
