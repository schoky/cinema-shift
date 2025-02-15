export const calcOrderPrice = (activePlaces: Record<number, number[]>, places: Place[][]) => {
   let sum = 0
   Object.keys(activePlaces).forEach((row) => {
      activePlaces[+row].forEach((item, index) => {
         if (item > 0) {
            sum += places[+row - 1][index].price
         }
      })
   })

   return sum
}
