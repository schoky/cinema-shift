import { useQuery } from '@tanstack/react-query'

import { getOrders } from '../requests/getOrders'

export const useGetOrdersQuery = (settings?: QuerySettings<typeof getOrders>) =>
   useQuery({
      queryKey: ['getOrders'],
      queryFn: () => getOrders({ config: settings?.config }),
      ...settings?.options
   })
