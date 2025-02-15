import { instance } from '../instance'

interface PostOtpParams {
   phone: string
}

type postOtpRequestConfig = RequestConfig<PostOtpParams>

export const postOtp = ({ params, config }: postOtpRequestConfig) =>
   instance.post<PostOtpRespose>('/auth/otp', params, config)
