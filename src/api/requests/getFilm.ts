import { instance } from '../instance'

interface GetFilmParams {
   id: string
}

type getFilmRequestConfig = RequestConfig<GetFilmParams>

export const getFilm = ({ params, config }: getFilmRequestConfig) =>
   instance.get<GetFilmResponse>(`/cinema/film/${params.id}`, config)
