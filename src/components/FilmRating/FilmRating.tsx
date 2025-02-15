import { Rating, Text } from '@mantine/core'

import styles from './FilmRating.module.css'

export const FilmRating = ({ rating }: { rating: number }) => (
   <>
      <Rating
         size="md"
         defaultValue={rating / 2}
         fractions={10}
         readOnly
         mt={16}
         className={styles.rating}
      />
      <Text size="sm" c="#637083" mt={2}>
         Kinopoisk - {rating}
      </Text>
   </>
)
