import { instance } from '../instance'

export interface GetFilmScheduleParams {
   id: string
}

type getFilmScheduleRequestConfig = RequestConfig<GetFilmScheduleParams>

export const getFilmSchedule = ({ params, config }: getFilmScheduleRequestConfig) =>
   instance.get<GetFilmScheduleResponse>(`/cinema/film/${params.id}/schedule`, config)
