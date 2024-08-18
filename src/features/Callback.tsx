// src/components/Callback.js
import React, { useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import Cookies from "js-cookie"
import {
  checkIfReceivedTokensMatchesWithCookiesTokens,
  checkStateFromCookiesAndUrl,
} from "../authFlow/authorizationFlow"
import { useCallbackAndGetTokensMutation } from "./api/apiSlice"
import { useAppDispatch } from "../app/hooks"
import { setTokens } from "./api/authSlice"

const Callback = () => {
  const dispatch = useAppDispatch()
  const [callbackAndGetTokens, { data, error, isLoading }] =
    useCallbackAndGetTokensMutation()

  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    // Step two: Check state from cookies and URL
    checkStateFromCookiesAndUrl()

    const fetchTokens = async () => {
      try {
        // Step five: Fetch tokens and validate them
        const response = await callbackAndGetTokens("").unwrap()
        console.log("Tokens received:", response)

        if (
          response.access_token &&
          response.refresh_token &&
          response.id_token
        ) {
          dispatch(
            setTokens({
              accessToken: response.access_token,
              refreshToken: response.refresh_token,
              idToken: response.id_token,
            }),
          )
        }

        checkIfReceivedTokensMatchesWithCookiesTokens({
          accessToken: response.access_token,
          refreshToken: response.refresh_token,
          idToken: response.id_token,
        })

        navigate("/")
      } catch (error) {
        console.error("Failed to fetch tokens:", error)
        navigate("/login")
      }
    }

    fetchTokens()
  }, [])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error occurred: {JSON.stringify(error)}</div>
  }

  return (
    <div>
      <h1>Callback and Get Tokens</h1>
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  )
}

export default Callback
