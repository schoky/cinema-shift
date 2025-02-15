import { instance } from '../instance'

interface PostSigninParams {
   phone: string
   code: string
}

type postSigninRequestConfig = RequestConfig<PostSigninParams>

export const postSignin = ({ params, config }: postSigninRequestConfig) =>
   instance.post<PostSigninRespose>('/users/signin', params, config)
