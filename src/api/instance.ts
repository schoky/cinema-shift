import axios from 'axios'

import { COOKIES } from '@/constants/cookies'
import { URL } from '@/constants/url'
import { getCookie } from '@/helpers/getCookie'
import { isSSR } from '@/helpers/isSSR'

export const instance = axios.create({
   baseURL: URL
})

instance.interceptors.request.use(async (config) => {
   let token: string | undefined
   if (isSSR) {
      const cookies = (await import('next/headers')).cookies
      const cookieStore = cookies()
      token = cookieStore.get(COOKIES.AUTH)?.value
   } else {
      token = getCookie(COOKIES.AUTH)
   }

   config.headers.Authorization = `Bearer ${token}`

   return config
})
