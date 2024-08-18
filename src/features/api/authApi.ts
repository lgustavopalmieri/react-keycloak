import axios from "axios"
import { callbackBodyParamsToGettingTokens } from "../../authFlow/authorizationFlow"

export const callbackAndGetTokens = async () => {
  try {
    const response = await axios.post(
      "/token",
      callbackBodyParamsToGettingTokens(), 
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    )

    return response.data
  } catch (error) {
    console.error("Erro ao obter tokens:", error)
    throw error
  }
}
