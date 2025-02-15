import { instance } from '../instance'

export interface PostPaymentParams {
   filmId: string
   person: {
      firstname: string
      lastname: string
      middlename: string
      phone: string
   }
   debitCard: {
      pan: string
      expireDate: string
      cvv: string
   }
   seance: {
      date: string
      time: string
   }
   tickets: {
      row: number
      column: number
   }[]
}

type postPaymentRequestConfig = RequestConfig<PostPaymentParams>

export const postPayment = ({ params, config }: postPaymentRequestConfig) =>
   instance.post<PostPaymentResponse>('/cinema/payment', params, config)
