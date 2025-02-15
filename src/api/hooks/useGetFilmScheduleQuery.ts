import { useQuery } from '@tanstack/react-query'

import type { GetFilmScheduleParams } from '../requests/getFilmSchedule'
import { getFilmSchedule } from '../requests/getFilmSchedule'

export const useGetFilmScheduleQuery = (
   params: GetFilmScheduleParams,
   settings?: QuerySettings<typeof getFilmSchedule>
) =>
   useQuery({
      queryKey: ['getFilmSchedule'],
      queryFn: () => getFilmSchedule({ params, config: settings?.config }),
      refetchInterval: 30000,
      gcTime: 0,
      staleTime: 0,
      ...settings?.options
   })
