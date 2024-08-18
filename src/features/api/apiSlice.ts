// src/app/apiSlice.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { RootState } from "../../app/store"
import Cookies from "js-cookie"
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
    // firstToken: builder.mutation({
    //   query: ({ username, password, client_id }) => ({
    //     url: "/token",
    //     method: "POST",
    //     body: new URLSearchParams({
    //       username,
    //       password,
    //       client_id,
    //       grant_type: "password",
    //       scope: "openid",
    //     }),
    //     headers: {
    //       "Content-Type": "application/x-www-form-urlencoded",
    //     },
    //   }),
    // }),
    // step four
    callbackAndGetTokens: builder.mutation({
      query: (arg) => {
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

export const { useCallbackAndGetTokensMutation } =
  apiSlice
