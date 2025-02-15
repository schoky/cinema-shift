import { instance } from '../instance'

interface PatchProfileParams {
   profile: {
      firstname: string
      middlename: string
      lastname: string
      email: string
      city: string
   }
   phone: string
}

type patchProfileRequestConfig = RequestConfig<PatchProfileParams>

export const patchProfile = ({ params, config }: patchProfileRequestConfig) =>
   instance.patch<PatchProfileResponce>('/users/profile', params, config)
