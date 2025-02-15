// тут пока пипец, может позже вернусь и сделаю более красиво

import { Button, Flex, Select } from '@mantine/core'
import { useCounter } from '@mantine/hooks'
import { useState } from 'react'

interface TicketsFormProps {
   value?: Record<number, number[]>
   places?: Place[][]
   onChange: (value: Record<number, number[]>) => void
}

export const TicketsForm = ({ value, places, onChange }: TicketsFormProps) => {
   const [count, handlers] = useCounter(1)
   const [tickets, setTickets] = useState<{ row: number | undefined; column: number | undefined }[]>([])

   const editTicket = (index: number, row: number | undefined, column: number | undefined) => {
      const copyTickets = [...tickets]

      if (!copyTickets[index]) copyTickets[index] = { row: undefined, column: undefined }
      
      if (row || row == 0) {
         copyTickets[index].row = row
         copyTickets[index].column = column
      }

      if (value) {
         const copyTicketsMatrix = { ...value }

         Object.keys(copyTicketsMatrix).forEach((key) => {
            copyTicketsMatrix[+key].fill(0)
         })

         copyTickets.forEach((item) => {
            if ((item.row || item.row == 0) && (item.column || item.column == 0)) {
               copyTicketsMatrix[item.row + 1][item.column] = 1
            }
         })
         console.log(copyTicketsMatrix, copyTickets)
         onChange(copyTicketsMatrix)
      }

      setTickets(copyTickets)
   }

   return (
      <>
         {new Array(count).fill(0).map((item, index) => (
            <Flex key={index} gap={24} maw={368}>
               <Select
                  flex={1}
                  label="Ряд"
                  data={
                     places &&
                     places.map((item, index) => ({
                        value: index.toString(),
                        label: (index + 1).toString()
                     }))
                  }
                  onChange={(value) => {
                     editTicket(index, Number(value), undefined)
                  }}
               />
               <Select
                  flex={1}
                  label="Место"
                  value={
                     tickets[index] &&
                     (tickets[index].column || tickets[index].column == 0
                        ? tickets[index].column.toString()
                        : null)
                  }
                  data={
                     places &&
                     value &&
                     tickets[index] &&
                     (tickets[index].row || tickets[index].row === 0)
                        ? places[tickets[index].row].map((item, columnIndex) => ({
                             value: columnIndex.toString(),
                             label: (columnIndex + 1).toString(),
                             disabled:
                                item.type == 'BLOCKED' ||
                                item.type == 'PAYED' ||
                                value[(tickets[index].row as number) + 1][columnIndex] == 1
                          }))
                        : undefined
                  }
                  onChange={(value) => {
                     editTicket(index, tickets[index].row, Number(value))
                  }}
               />
            </Flex>
         ))}

         <Button variant="default" onClick={() => handlers.increment()}>
            Ещё билет
         </Button>
      </>
   )
}
