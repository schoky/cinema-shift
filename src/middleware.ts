import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { COOKIES } from './constants/cookies'
import { ROUTES } from './constants/routes'

const authRedirectUrls = [ROUTES.PROFILE, ROUTES.ORDERS]

export const middleware = async (request: NextRequest) => {
   const token = request.cookies.get(COOKIES.AUTH)?.value

   if (!token && authRedirectUrls.includes(request.nextUrl.pathname)) {
      return NextResponse.redirect(new URL(ROUTES.AUTH, request.url))
   }

   return NextResponse.next()
}
