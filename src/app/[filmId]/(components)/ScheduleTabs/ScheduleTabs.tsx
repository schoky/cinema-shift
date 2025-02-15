'use client'

import { Box, BoxProps, Button, Flex, SegmentedControl, Text } from '@mantine/core'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { HALLS, MONTHS, WEEK_DAYS } from '@/constants'
import { useOrder } from '@/contexts'
import { formatSeances, getDate, getPlaces } from '@/utils'

import styles from './ScheduleTabs.module.css'

interface ScheduleTabsProps extends BoxProps {
   data: GetFilmScheduleResponse['schedules']
   filmId: string
}
export const ScheduleTabs = ({ data, filmId, ...props }: ScheduleTabsProps) => {
   const [tabValue, setTabValue] = useState(data[0].date)
   const [activeBtn, setActiveBtn] = useState({ hall: '', time: '' })
   const { details, cache, setSeance } = useOrder()

   const router = useRouter()

   useEffect(() => {
      setActiveBtn({ hall: '', time: '' })
   }, [tabValue])

   useEffect(() => {
      details.filmId = filmId
      setSeance(tabValue, activeBtn.time)
      if (tabValue && activeBtn.time) {
         cache.places = getPlaces(tabValue, activeBtn.time, data)
         cache.hall = activeBtn.hall
      }
      console.log(details)
   }, [activeBtn])

   return (
      <Box>
         <Box className={styles.container} {...props}>
            <SegmentedControl
               className={styles.tabs}
               radius="16px"
               value={tabValue}
               onChange={setTabValue}
               data={data.map((item) => {
                  const date = getDate(item.date)
                  return {
                     label: `${WEEK_DAYS[date.getDay()]}, ${date.getDate()} ${MONTHS[date.getMonth()]}`,
                     value: item.date
                  }
               })}
            />
         </Box>
         <Flex direction="column" gap={24} mt={24}>
            {data.map((item) => {
               if (item.date == tabValue) {
                  const seances = formatSeances(item.seances)
                  return Object.keys(seances).map((hall) => (
                     <Box key={hall}>
                        <Text size="xs">
                           {HALLS[hall]}
                        </Text>
                        <Flex gap={8} mt={16} wrap="wrap">
                           {seances[hall].map((time) => (
                              <Button
                                 key={time}
                                 variant="default"
                                 className={`${styles.btn} ${activeBtn.hall == hall && activeBtn.time == time ? styles.active : ''}`}
                                 onClick={() =>
                                    activeBtn.hall == hall && activeBtn.time == time
                                       ? setActiveBtn({ hall: '', time: '' })
                                       : setActiveBtn({ hall: hall, time: time })
                                 }
                              >
                                 {time}
                              </Button>
                           ))}
                        </Flex>
                     </Box>
                  ))
               }
            })}
         </Flex>
         <Button
            mt={48}
            w="100%"
            maw={328}
            disabled={activeBtn.time ? false : true}
            onClick={() => {
               if (activeBtn.time) {
                  router.push(`/${filmId}/order`)
               }
            }}
         >
            Продолжить
         </Button>
      </Box>
   )
}
