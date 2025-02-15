import { instance } from '../instance'


export const getToday = ({ config }: RequestConfig) =>
   instance.get<GetTodayResponse>('/cinema/today', config)
