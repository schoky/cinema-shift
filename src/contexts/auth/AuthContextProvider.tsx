'use client'

import { useRouter } from 'next/navigation'
import { ReactNode, useEffect, useState } from 'react'

import { getSession } from '@/api/requests/getSession'
import { ROUTES } from '@/constants'
import { getCookie } from '@/helpers/getCookie'

import { AuthContext } from './AuthContext'

export const AuthContextProvider = ({
   defaultUser,
   defaultToken,
   children
}: {
   defaultUser?: User
   defaultToken?: string
   children: ReactNode
}) => {
   const router = useRouter()
   const [user, setUser] = useState<User | undefined>(defaultUser)
   const [token, setToken] = useState<string | undefined>(defaultToken)

   const logout = () => {
      setToken(undefined)
      setUser(undefined)
      document.cookie = 'authToken='
      router.replace(ROUTES.ROOT)
      router.refresh()
   }

   const login = (token: string) => {
      setToken(token)
      document.cookie = `authToken=${token}`
      getSession({ config: { validateStatus: (status) => status < 600 } }).then((data) => {
         console.log(token, data)
         setUser(data.data.user)
         router.replace(ROUTES.ROOT)
         router.refresh()
      })
   }

   const update = () => {
      getSession({ config: { validateStatus: (status) => status < 600 } }).then((data) => {
         setUser(data.data.user)
         setToken(getCookie('authToken'))
      })
   }

   useEffect(() => {
      const localToken = getCookie('authToken')

      if (localToken != token) {
         getSession({ config: { validateStatus: (status) => status < 600 } }).then((data) => {
            console.log(localToken, data)
            setUser(data.data.user)
         })

         setToken(localToken)
      }
   }, [token])

   return (
      <AuthContext.Provider value={{ user, token, setUser, setToken, logout, login, update }}>
         {children}
      </AuthContext.Provider>
   )
}
