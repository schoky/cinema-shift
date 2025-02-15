export const getOrderPlaces = (tickets: PostPaymentResponse['order']['tickets']) => {
   const places: { [key: number]: number[] } = {}
   tickets.forEach((item) => {
      places[item.row] = []
   })
   tickets.forEach((item) => {
      places[item.row].push(item.column)
   })

   const placesArr: {row: number, columns: number[]}[] = []
   Object.keys(places).forEach((key) => {
      placesArr.push({ row: +key, columns: places[+key] })
   })
   return placesArr
}
