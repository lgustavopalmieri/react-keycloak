import { baseKeycloakUrl } from "../features/api/apiSlice"
import { generateRandomBase64 } from "./codes"
import Cookies from "js-cookie"
import { decodeJwt } from "jose"

// step one
export const redirectToKeycloakLogin = () => {
  const authPath = "/auth?"
  const nonce = generateRandomBase64()
  const state = generateRandomBase64()

  // em produção
  // Cookies.set('nonce', nonce, { secure: true, sameSite: 'Strict' });
  // Cookies.set('state', state, { secure: true, sameSite: 'Strict' });

  Cookies.set("nonce", nonce)
  Cookies.set("state", state)

  const params = new URLSearchParams({
    client_id: "test-client",
    redirect_uri: "http://localhost:5173/callback",
    response_type: "code",
    scope: "openid",
    nonce,
    state,
  }).toString()

  return (window.location.href = `${baseKeycloakUrl}${authPath}${params}`)
}

// step two
export const checkStateFromCookiesAndUrl = () => {
  const urlParams = new URLSearchParams(window.location.search)
  const stateFromUrl = urlParams.get("state")
  const stateFromCookie = Cookies.get("state")
  if (stateFromUrl !== stateFromCookie) {
    console.log("Unauthenticated")
    window.location.href = `/login`
  }
  console.log("authenticated. states matches.")
  return
}

// step three
export const callbackBodyParamsToGettingTokens = () => {
  const getCodeFromUrl =
    new URLSearchParams(window.location.search).get("code")?.toString() || ""
  const bodyParams = new URLSearchParams({
    client_id: "test-client",
    grant_type: "authorization_code",
    code: getCodeFromUrl,
    redirect_uri: "http://localhost:5173/callback",
  }).toString()
  return bodyParams
}

interface ICheckTokens {
  accessToken: string
  refreshToken: string
  idToken: string
}

export const setTokensOnCookies = ({
  accessToken,
  refreshToken,
  idToken,
}: ICheckTokens) => {
  Cookies.set("accessToken", accessToken)
  Cookies.set("refreshToken", refreshToken)
  Cookies.set("idToken", idToken)

  return {
    accessToken,
    refreshToken,
    idToken,
  }
}

// step six
export const checkIfReceivedTokensMatchesWithCookiesTokens = ({
  accessToken,
  refreshToken,
  idToken,
}: ICheckTokens) => {
  const payloadAccessToken = decodeJwt(accessToken)
  const payloadRefreshToken = decodeJwt(refreshToken)
  const payloadIdToken = decodeJwt(idToken)

  const nonceFromCookies = Cookies.get("nonce")

  if (
    payloadAccessToken.nonce !== nonceFromCookies ||
    payloadRefreshToken.nonce !== nonceFromCookies ||
    payloadIdToken.nonce !== nonceFromCookies
  ) {
    throw new Error("unauthenticated")
  }
  return setTokensOnCookies({
    accessToken,
    refreshToken,
    idToken,
  })
}

// logout
export const makeLogout = () => {
  const urlLogoutParams = new URLSearchParams({
    id_token_hint: Cookies.get("idToken") || "",
    post_logout_redirect_uri: "http://localhost:5173",
  }).toString()

  Cookies.remove("accessToken")
  Cookies.remove("refreshToken")
  Cookies.remove("idToken")

  const keycloakLogoutUrl = `${baseKeycloakUrl}/logout?${urlLogoutParams}`

  return (window.location.href = keycloakLogoutUrl)
}
