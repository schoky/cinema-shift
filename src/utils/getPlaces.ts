export const getPlaces = (date: string, time: string, data: GetFilmScheduleResponse['schedules']) => {
   let places: Place[][] = []
   data.forEach((item) => {
      if (item.date == date) {
         item.seances.forEach((seance) => {
            if (seance.time == time) {
               console.log(date, time, seance)
               places = seance.hall.places
            }
         })
      }
   })

   return places
}
