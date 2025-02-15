export const ROUTES = {
   ROOT: '/',
   PROFILE: '/profile',
   ORDERS: '/orders',
   AUTH: '/auth',
   FILM: (id: string) => `/${id}`,
   FILM_ORDER: (id: string) => `${ROUTES.FILM(id)}/order`
}
