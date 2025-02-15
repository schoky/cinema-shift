import { instance } from '../instance'

type getSessionRequestConfig = RequestConfig

export const getSession = ({ config }: getSessionRequestConfig) =>
   instance.get<GetSessionResponse>(`/users/session`, config)
