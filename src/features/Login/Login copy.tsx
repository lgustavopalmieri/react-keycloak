// // FIRST LOGIN LOGIC

// import React from "react"
// import { useAppDispatch, useAppSelector } from "../../app/hooks"
// import { useFirstTokenMutation } from "../api/apiSlice"
// import { setToken } from "../api/authSlice"

// const Login: React.FC = () => {
//   const [firstToken, { isLoading, error, data }] = useFirstTokenMutation()
//   const dispatch = useAppDispatch()
//   const token = useAppSelector(state => state.auth.token)

//   const handleLogin = async () => {
//     try {
//       const response = await firstToken({
//         username: "test",
//         password: "test",
//         client_id: "test-client",
//       }).unwrap()

//       if (response) {
//         dispatch(
//           setToken({
//             refresh_token: response.refresh_token,
//             access_token: response.access_token,
//           }),
//         )
//       }
//     } catch (err) {
//       console.error("Login failed:", err)
//     }
//   }

//   console.log(data)

//   return (
//     <div>
//       <button onClick={handleLogin} disabled={isLoading}>
//         {isLoading ? "Logging in..." : "Login"}
//       </button>
//       {error && <div>Error: {error as any}</div>}
//       <div>
//         <strong>Refresh Token:</strong> {token?.refresh_token || "N/A"}
//       </div>
//       <div>
//         <strong>Access Token:</strong> {token?.access_token || "N/A"}
//       </div>
//     </div>
//   )
// }

// export default Login
