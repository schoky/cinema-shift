import { Box, Button, Flex, SimpleGrid, Text, Title } from '@mantine/core'
import type { Metadata } from 'next'
import Link from 'next/link'

import { getToday } from '@/api'
import { FilmImage,FilmRating } from '@/components'
import { URL } from '@/constants'

import styles from './page.module.css'

export const metadata: Metadata = {
   title: 'ШИФТ CINEMA',
   description: 'Самый лучший кинотеатр'
}

const Home = async () => {
   const getTodayResponse = await getToday({})

   return (
      <Box mt={48}>
         <Title order={2}>Афиша</Title>
         <SimpleGrid spacing={32} mt={16} className={styles.grid}>
            {getTodayResponse.data.films.map((item) => (
               <Flex direction="column" key={item.id}>
                  <FilmImage
                     img={`${URL}/${item.img}`}
                     genre={item.genres[0]}
                     country={item.country.name}
                     releaseDate={item.releaseDate}
                  />
                  <Flex direction="column" justify="space-between" flex={1} mt={16}>
                     <Box>
                        <Title order={3}>{item.name}</Title>
                        <Text size="sm" c="#637083">
                           Фильм
                        </Text>
                     </Box>
                     <Box>
                        <FilmRating rating={Number(item.userRatings.kinopoisk)} />
                        <Button w="100%" mt={16} component={Link} href={`/${item.id}`}>
                           Подробнее
                        </Button>
                     </Box>
                  </Flex>
               </Flex>
            ))}
         </SimpleGrid>
      </Box>
   )
}

export default Home
