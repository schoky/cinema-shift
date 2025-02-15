'use client'

import { createContext } from 'react'

import { PostPaymentParams } from '@/api/requests/postPayment'

interface OrderContext {
   details: PostPaymentParams
   cache: { places: Place[][] | undefined, hall: string }
   setDetails: (details: PostPaymentParams) => void
   setSeance: (date: string, time: string) => void
   setTickets: (matrix: { [key: number]: number[] }) => void
   stage: number
   setStage: (stage: number) => void
}

export const OrderContext = createContext<OrderContext>({
   details: {
      filmId: '',
      person: { firstname: '', lastname: '', middlename: '', phone: '' },
      debitCard: { pan: '', expireDate: '', cvv: '' },
      seance: { date: '', time: '' },
      tickets: []
   },
   cache: { places: [], hall: '' },
   setDetails: () => {},
   setSeance: () => {},
   setTickets: () => {},
   stage: 0,
   setStage: () => {}
})
