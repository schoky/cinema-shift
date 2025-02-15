export const getHall = (date: string, time: string, data: GetFilmScheduleResponse['schedules']) => {
   let hall = ''
   data.forEach((item) => {
      if (item.date == date) {
         item.seances.forEach((seance) => {
            if (seance.time == time) {
               hall = seance.hall.name
            }
         })
      }
   })

   return hall
}
