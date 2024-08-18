// src/components/Login.js
import React, { useEffect } from "react"
import { redirectToKeycloakLogin } from "../../authFlow/authorizationFlow"

const Login = () => {
  useEffect(() => {
    redirectToKeycloakLogin()
  }, [])

  return <div>Redirecting to Keycloak...</div>
}

export default Login
