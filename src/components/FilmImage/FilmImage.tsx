import { Box, BoxProps, Flex, Image, Text } from '@mantine/core'

import styles from './FilmImage.module.css'

interface Props {
   img: string
   genre: string
   country: string
   releaseDate: string
}

export const FilmImage = ({ img, genre, country, releaseDate, ...props }: Props & BoxProps) => (
   <Box pos="relative" {...props}>
      <Image src={img} alt="Лого фильма" loading="lazy" className={styles.img} />
      <Flex direction="column" className={styles.film_info}>
         <Text size="sm" ta="center" fw={500}>
            {genre}
         </Text>
         <Text size="sm" ta="center">
            {country}, {releaseDate.split(' ')[2] || releaseDate}
         </Text>
      </Flex>
   </Box>
)
