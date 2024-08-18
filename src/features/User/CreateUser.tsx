import React, { useEffect, useState } from "react"
import axios from "axios"
import axiosInstance from "../../app/axiosApi"
import { useAppSelector } from "../../app/hooks"

const User = () => {
  const [userData, setUserData] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get("/users/find-one", {
          params: { email: "buba@mail.com" },
        })
        setUserData(response.data)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      <h1>User Details</h1>
      {userData ? (
        <pre>{JSON.stringify(userData, null, 2)}</pre>
      ) : (
        <div>No user data found</div>
      )}
    </div>
  )
}

export default User
