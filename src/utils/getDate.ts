export const getDate = (date: string) => {
   const formatDate = date.split('.')
   formatDate[2] = '20' + formatDate[2]
   ;[formatDate[0], formatDate[1]] = [formatDate[1], formatDate[0]]

   return new Date(formatDate.join('.'))
}
