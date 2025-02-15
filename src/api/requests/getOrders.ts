import { instance } from '../instance'

type getOrdersRequestConfig = RequestConfig

export const getOrders = ({ config }: getOrdersRequestConfig) =>
   instance.get<GetOrdersResponse>(`/cinema/orders`, config)
