export const getActiveRowPlaces = (arr: number[]) => {
   const activePlaces: number[] = []
   arr.forEach((item, index) => {
      if (item > 0) {
         activePlaces.push(index + 1)
      }
   })
   return activePlaces
}
