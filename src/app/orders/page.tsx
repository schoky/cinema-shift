import { Flex, Title } from '@mantine/core'
import { Metadata } from 'next'

import { OrdersTabs } from './(components)/OrdersTabs/OrdersTabs'

export const metadata: Metadata = {
   title: 'Билеты - ШИФТ CINEMA'
}

const Orders = async () => (
   <Flex direction="column" gap={24} mt={48}>
      <Title order={2}>Заказы</Title>
      <OrdersTabs />
   </Flex>
)

export default Orders
