import axios from "axios"
import { RootState, store } from "./store"
import { decodeJwt } from "jose"
import Cookies from "js-cookie"

const axiosInstance = axios.create({
  baseURL: "my url services here",
})

axiosInstance.interceptors.request.use(
  config => {
    const state: RootState = store.getState()
    const token = state.auth.token

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  },
)

axiosInstance.interceptors.request.use(
  async config => {
    const accessToken = Cookies.get("accessToken")

    if (accessToken) {
      try {
        const refreshToken = Cookies.get("refreshToken")
        if (refreshToken) {
          await refreshAccessToken(refreshToken)
        }
      } catch (error) {
        console.error("Error decoding token:", error)
      }
    }

    return config
  },
  error => Promise.reject(error),
)

const refreshAccessToken = async (refreshToken: string) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/auth/realms/your-realm/protocol/openid-connect/token",
      new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
        client_id: "test-client",
      }).toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    )

    // Handle new tokens
    const { access_token, refresh_token } = response.data

    // Store new tokens
    Cookies.set("accessToken", access_token)
    Cookies.set("refreshToken", refresh_token)
  } catch (error) {
    console.error("Failed to refresh token:", error)
    // Handle token refresh error (e.g., redirect to login)
  }
}

export default axiosInstance
