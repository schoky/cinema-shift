import { ReactNode } from 'react'

import { getFilm } from '@/api'
import { OrderContextProvider } from '@/contexts'

export async function generateMetadata({ params }: { params: { filmId: string } }) {
   const getFilmResponse = await getFilm({ params: { id: params.filmId } })

   return {
      title: `${getFilmResponse.data.film.name} - ШИФТ CINEMA`
   }
}

const OrderLayout = ({ children }: { children: ReactNode }) => {
   return <OrderContextProvider>{children}</OrderContextProvider>
}

export default OrderLayout
