import { useQuery } from '@tanstack/react-query'

import { postPayment, PostPaymentParams } from '../requests/postPayment'

export const usePostPaymentQuery = (
   params: PostPaymentParams,
   settings?: QuerySettings<typeof postPayment>
) =>
   useQuery({
      queryKey: ['postPayment'],
      queryFn: () => postPayment({ params, config: settings?.config }),
      refetchOnWindowFocus: false,
      ...settings?.options
   })
