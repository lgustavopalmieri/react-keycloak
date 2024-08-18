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
  },
  reducers: {
    setTokens: (state, action) => {
      state.token = action.payload
    },
  },
})

export const { setTokens } = authSlice.actions
export default authSlice.reducer
