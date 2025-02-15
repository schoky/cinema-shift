type ApiRequestConfig = import('axios').AxiosRequestConfig

type RequestConfig<Params = undefined> = Params extends undefined
  ? {
      config?: ApiRequestConfig
    }
  : {
      params: Params
      config?: ApiRequestConfig
    }


interface QuerySettings<Func = unknown> {
   config?: ApiRequestConfig
   options?: Omit<
      import('@tanstack/react-query').UseQueryOptions<
         Awaited<ReturnType<Func>>,
         any,
         Awaited<ReturnType<Func>>,
         any
      >,
      'queryKey'
   >
}

interface StandartResponse {
   success: boolean
   reason: string
}

interface GetTodayResponse extends StandartResponse {
   films: Film[]
}

interface GetFilmResponse extends StandartResponse {
   film: Film
}

interface GetFilmScheduleResponse extends StandartResponse  {
   schedules: {
      date: string
      seances: Seance[]
   }[]
}

interface PostPaymentResponse extends StandartResponse  {
   order: Order
}



interface PostOtpRespose extends StandartResponse  {
   retryDelay: number
}

interface PostSigninRespose extends StandartResponse  {
   user: {
      phone: string
      firstname: string
      middlename: string
      lastname: string
      email: string
      city: string
   }
   token: string
}

interface GetSessionResponse extends StandartResponse  {
   user: User
}

interface GetOrdersResponse extends StandartResponse  {
   orders: Order[]
}

interface PatchProfileResponce extends StandartResponse  {
   user: User
}

interface User {
   _id: string
   phone: string
   firstname: string
   lastname: string
   middlename: string
   email?: string
   city?: string
}

interface Film {
   id: string
   name: string
   originalName: string
   description: string
   releaseDate: string
   actors: {
      id: string
      professions: string
      fullName: string
   }[]
   directors: {
      id: string
      professions: string
      fullName: string
   }[]
   runtime: number
   ageRating: string
   genres: string[]
   userRatings: {
      kinopoisk: string
      imdb: string
   }
   img: string
   country: {
      name: string
      code: string
      code2: string
      id: number
   }
}

interface Seance {
   time: string
   hall: {
      name: string
      places: Place[][]
   }
}

interface Order {
   _id: string
   filmName: string
   orderNumber: number
   tickets: {
      filmId: string
      row: number
      column: number
      seance: {
         date: string
         time: string
      }
      phone: string
      status: string
   }[]
   person: {
      firstname: string
      lastname: string
      middlename: string
      phone: string
   }
   status: 'PAYED' | 'CANCELED'
}

interface Place {
   price: number
   type: string
}
