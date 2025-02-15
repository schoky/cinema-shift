import { instance } from '../instance'

interface PutCancelOrderParams {
   orderId: string
}

type putCancelOrderRequestConfig = RequestConfig<PutCancelOrderParams>

export const putCancelOrder = ({params, config}:putCancelOrderRequestConfig) =>
   instance.put<StandartResponse>(
      `/cinema/orders/cancel`,
      params,
      config
   )
