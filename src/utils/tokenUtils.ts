import { decodeJwt } from "jose"
import Cookies from "js-cookie"

// export const checkTokenValidity = (token: string) => {
//   try {
//     const { exp } = decodeJwt(token)
//     console.log(new Date(exp as any))
//     if (!exp) {
//       throw new Error("Invalid token: no expiration field")
//     }
//     const currentTime = Math.floor(Date.now() / 1000)
//     if (currentTime > exp) {
//       throw new Error("Token expired")
//     }
//   } catch (error) {
//     console.error("Token validation failed:", error)
//     // Handle invalid token (e.g., redirect to login)
//     handleInvalidToken()
//   }
// }

// const handleInvalidToken = () => {
//   Cookies.remove("accessToken")
//   Cookies.remove("refreshToken")
//   Cookies.remove("idToken")
//   window.location.href = "/login"
// }

const isTokenExpired = (token: string) => {
  try {
    // Decodificar o token para obter o payload
    const decodedToken = decodeJwt(token)

    // Obter a data de expiração (exp é o timestamp em segundos)
    const expirationTime = decodedToken.exp

    // Obter o tempo atual em segundos
    const currentTime = Math.floor(Date.now() / 1000)

    // Verificar se o token expirou
    return (expirationTime as any) < currentTime
  } catch (error) {
    console.error("Erro ao decodificar o token:", error)
    return true // Se houver um erro ao decodificar, consideramos o token expirado
  }
}

// Função para verificar se o token do cookie expirou
export const checkIfTokenInCookieExpired = () => {
  // Recuperar o token do cookie
  const token = Cookies.get("accessToken")

  if (!token) {
    console.log("Token não encontrado no cookie.")
    return true // Se o token não estiver presente, consideramos expirado ou inválido
  }

  // Verificar se o token está expirado
  const expired = isTokenExpired(token)

  if (expired) {
    console.log("Token expirado.")
  } else {
    console.log("Token válido.")
  }

  return expired
}
