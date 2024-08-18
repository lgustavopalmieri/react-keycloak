// src/features/auth/authSlice.js
import { createSlice } from "@reduxjs/toolkit"
import Cookies from "js-cookie"

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: {
      refreshToken: "",
      accessToken: "",
      idToken: "",
    },
    isAuthenticated: false,
  },
  reducers: {
    setTokens: (state, action) => {
      state.token = action.payload
    },
    setIsAuthenticated: (state, action) => {
      console.log("entrou no estado", action.payload)
      state.isAuthenticated = action.payload
    },
  },
})

export const { setTokens, setIsAuthenticated } = authSlice.actions
export default authSlice.reducer
