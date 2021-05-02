import { fb } from 'service'
import { useEffect, useState } from 'react'

export const useAuth = () => {
  const [authUser, setAuthUser] = useState()

  useEffect(() => {
    const unsubscrbe = fb.auth.onAuthStateChanged(user => {
      if (user) {
        setAuthUser(user)
      }
      else {
        setAuthUser(null)
      }
    })

    return unsubscrbe
  }, [])

  return {
    authUser,
  }
}