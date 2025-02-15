import { Box, Flex, SimpleGrid, Spoiler, Text, Title } from '@mantine/core'
import { IconChevronLeft } from '@tabler/icons-react'
import Link from 'next/link'

import { getFilm, getFilmSchedule } from '@/api'
import { FilmImage, FilmRating } from '@/components'
import { URL } from '@/constants'

import { ScheduleTabs } from './(components)/ScheduleTabs/ScheduleTabs'
import styles from './page.module.css'

const Film = async ({ params }: { params: { filmId: string } }) => {
   const getFilmResponse = await getFilm({ params: { id: params.filmId } })
   const getFilmScheduleResponse = await getFilmSchedule({ params: { id: params.filmId } })

   return (
      <>
         <Flex gap={16} mt={24} component={Link} href="/" w="fit-content">
            <IconChevronLeft color="#97A1AF" />
            <Text fw={500} c="#637083">
               Назад
            </Text>
         </Flex>
         <SimpleGrid mt={24} className={styles.grid}>
            <Flex direction="column">
               <FilmImage
                  img={`${URL}/${getFilmResponse.data.film.img}`}
                  genre={getFilmResponse.data.film.genres[0]}
                  country={getFilmResponse.data.film.country.name}
                  releaseDate={getFilmResponse.data.film.releaseDate}
                  className={styles.film_img}
               />
            </Flex>

            <Box>
               <Title order={1}>{getFilmResponse.data.film.name}</Title>
               <Text size="sm" c="#637083">
                  Фильм
               </Text>
               <FilmRating rating={Number(getFilmResponse.data.film.userRatings.kinopoisk)} />
               <Spoiler showLabel="раскрыть" hideLabel="скрыть" mt={16}>
                  {getFilmResponse.data.film.description}
               </Spoiler>
            </Box>
         </SimpleGrid>
         <Title order={2} mt={48}>
            Расписание
         </Title>
         <ScheduleTabs data={getFilmScheduleResponse.data.schedules} filmId={params.filmId} mt={26} />
      </>
   )
}

export default Film
