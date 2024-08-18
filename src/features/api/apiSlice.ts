// src/app/apiSlice.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { RootState } from "../../app/store"
import { callbackBodyParamsToGettingTokens } from "../../authFlow/authorizationFlow"

export const baseKeycloakUrl =
  "http://localhost:8080/realms/test-realm/protocol/openid-connect"

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: baseKeycloakUrl,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState
      const token = state.auth.token
      if (token) {
        headers.set("authorization", `Bearer ${token}`)
      }
      return headers
    },
  }),
  endpoints: builder => ({
    // step four
    callbackAndGetTokens: builder.mutation({
      query: arg => {
        return {
          url: `/token`,
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: callbackBodyParamsToGettingTokens(),
        }
      },
    }),
  }),
})

export const { useCallbackAndGetTokensMutation } = apiSlice
