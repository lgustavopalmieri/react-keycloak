import axios from "axios"
import Cookies from "js-cookie"

const axiosInstance = axios.create({
  baseURL: "http://localhost:8086/",
})

axiosInstance.interceptors.request.use(
  config => {
    const accessToken = Cookies.get("accessToken")
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
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
      "http://localhost:8080/realms/test-realm/protocol/openid-connect/token",
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
    const { access_token, refresh_token } = response.data
    Cookies.set("accessToken", access_token)
    Cookies.set("refreshToken", refresh_token)
  } catch (error) {
    console.error("Failed to refresh token:", error)
  }
}

export default axiosInstance
