import { Flex, Text, Tooltip } from '@mantine/core'

import styles from './Matrix.module.css'

interface MatrixSceletonProps {
   places?: Place[][]
}

export const MatrixSceleton = ({ places }: MatrixSceletonProps) => (
   <>
      <Text size="xs">Ряд</Text>
      {places &&
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
                           className={`${styles.place}`}
                           
                        >
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
