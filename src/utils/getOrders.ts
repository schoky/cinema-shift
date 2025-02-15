import { getDate } from './getDate'

export const getOrders = (allOrders: Order[]) => {
   const orders: { active: Order[]; history: Order[] } = {
      active: [],
      history: []
   }

   allOrders.forEach((item) => {
      if (item.status == 'CANCELED' || getDate(item.tickets[0].seance.date).getTime() < Date.now()) {
         orders.history.push(item)
      } else {
        orders.active.push(item)
      }
   })

   return orders
}
