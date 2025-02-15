'use client'

import { Badge, Box, Button, Card, Flex, SegmentedControl, SimpleGrid, Text, Title } from '@mantine/core'
import { modals } from '@mantine/modals'
import { useState } from 'react'

import { putCancelOrder,useGetOrdersQuery  } from '@/api'
import { MONTHS,PAYMENT_STATUSES,WEEK_DAYS } from '@/constants'
import { getDate, getOrderPlaces, getOrders } from '@/utils'

import styles from './OrdersTabs.module.css'

export const OrdersTabs = () => {
   const [tabValue, setTabValue] = useState('active')
   const getOrdersResponse = useGetOrdersQuery()

   return (
      <Flex direction="column" gap={24}>
         <Box className={styles.container}>
            <SegmentedControl
               className={styles.tabs}
               radius={16}
               fullWidth
               value={tabValue}
               onChange={setTabValue}
               data={[
                  { label: 'Активные', value: 'active' },
                  { label: 'История', value: 'history' }
               ]}
            />
         </Box>
         <SimpleGrid spacing={24} className={styles.grid}>
            {getOrdersResponse.data &&
               getOrders(getOrdersResponse.data?.data.orders)[tabValue as 'active' | 'history'].map(
                  (item, index) => (
                     <Card key={index} withBorder className={styles.card}>
                        <Flex w="100%" justify="space-between" gap={24}>
                           <Text size="sm" c="#97A1AF">
                              {getDate(item.tickets[0].seance.date).getDate()}{' '}
                              {MONTHS[getDate(item.tickets[0].seance.date).getMonth()]},{' '}
                              {WEEK_DAYS[getDate(item.tickets[0].seance.date).getDay()]}
                           </Text>
                           <Text size="sm" c="#97A1AF">
                              {item.tickets[0].seance.time}
                           </Text>
                        </Flex>
                        <Box>
                           <Title order={3} ta="center">
                              {item.filmName}
                           </Title>
                           {getOrderPlaces(item.tickets).map((place) => (
                              <Text key={place.row} size="sm" ta="center">
                                 {place.row} ряд, {place.columns.join(', ')} места
                              </Text>
                           ))}
                        </Box>
                        <Flex w="100%" justify="space-between" gap={24}>
                           <Badge
                              variant="light"
                              color={item.status == 'CANCELED' ? '#F64C4C' : '#40BF7F'}
                           >
                              {PAYMENT_STATUSES[item.status]}
                           </Badge>
                           <Text size="sm" c="#97A1AF">
                              Номер заказа {item.orderNumber}
                           </Text>
                        </Flex>
                        {tabValue == 'active' && (
                           <Button
                              variant="outline"
                              onClick={() =>
                                 modals.openContextModal({
                                    modal: 'customConfirmModal',
                                    innerProps: {
                                       title: 'Вернуть билет?',
                                       cancelText: 'Вернуть',
                                       confirmText: 'Отменить',
                                       onConfirmClick: () => {
                                          putCancelOrder({
                                             params: {
                                                orderId: item._id
                                             }
                                          })
                                             .then(() => getOrdersResponse.refetch())
                                             .catch((data) => console.log(data))
                                       }
                                    }
                                 })
                              }
                           >
                              Вернуть билет
                           </Button>
                        )}
                     </Card>
                  )
               )}
         </SimpleGrid>
      </Flex>
   )
}
