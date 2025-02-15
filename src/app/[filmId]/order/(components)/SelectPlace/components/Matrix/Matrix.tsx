import { Flex, Text, Tooltip } from '@mantine/core'

import styles from './Matrix.module.css'

interface MatrixProps {
   value?: Record<number, number[]>
   places?: Place[][]
   onChange: (value: Record<number, number[]>) => void
}

export const Matrix = ({ value, places, onChange }: MatrixProps) => {
   const togglePlace = (row: number, place: number) => {
      const matrix = { ...value }
      matrix[row][place] = Number(!value![row][place])
      onChange(matrix)
   }

   return (
      <>
         <Text size="xs">Ряд</Text>
         {value &&
            places &&
            places.map((row, indexRow) => (
               <Flex key={indexRow} gap={24}>
                  <Text size="sm" miw={16}>
                     {indexRow + 1}
                  </Text>
                  {row.map((item, indexCol) =>
                     item.type != 'BLOCKED' && item.type != 'PAYED' ? (
                        <Tooltip
                           key={indexCol}
                           bg="white"
                           label={
                              <>
                                 <Text size="xs" c="#141C24">{`${item.price} ₽`}</Text>
                                 <Text
                                    size="xs"
                                    c="#637083"
                                 >{`${indexRow + 1} ряд, ${indexCol + 1} место`}</Text>
                              </>
                           }
                        >
                           <Flex
                              justify="center"
                              align="center"
                              className={`${styles.place} ${value[indexRow + 1][indexCol] ? styles.active : ''}`}
                              onClick={() => togglePlace(indexRow + 1, indexCol)}
                           >
                              <Text size="8px" c="white">
                                 {value[indexRow + 1][indexCol] ? indexCol + 1 : ''}
                              </Text>
                           </Flex>
                        </Tooltip>
                     ) : (
                        <Flex
                           key={indexCol}
                           className={`${styles.place} ${item.type == 'BLOCKED' ? styles.blocked : styles.payed}`}
                        ></Flex>
                     )
                  )}
               </Flex>
            ))}
      </>
   )
}
