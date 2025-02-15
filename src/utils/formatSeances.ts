export const formatSeances = (seances: Seance[]) => {
   const formatSeances: { [key: string]: string[] } = {}
   seances.forEach((item) => {
      formatSeances[item.hall.name] = []
   })
   seances.forEach((item) => {
      formatSeances[item.hall.name].push(item.time)
   })

   return formatSeances
}
