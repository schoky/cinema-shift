'use client'
import { Box, Flex, Image, Progress, Text, Title } from '@mantine/core'

import { useOrder } from '@/contexts'

import { CardForm } from './(components)/CardForm/CardForm'
import { Receipt } from './(components)/Receipt/Receipt'
import { SelectPlace } from './(components)/SelectPlace/SelectPlace'
import { UserForm } from './(components)/UserForm/UserForm'

const Order = () => {
   const { stage } = useOrder()

   return (
      <>
         <Flex gap={24} align="center" mt={48}>
            {stage == 4 && <Image src="/Success.jpg" />}
            <Title order={2}>
               {stage == 1 && 'Выбор места'}
               {stage == 2 && 'Введите ваши данные'}
               {stage == 3 && 'Введите данные карты для оплаты'}
               {stage == 4 && 'Оплата прошла успешно!'}
            </Title>
         </Flex>

         {stage < 4 && (
            <Box mt={24} mb={24}>
               <Text>Шаг {stage} из 3</Text>
               <Progress color="#40BF7F" value={(stage / 3) * 100} maw={368} />
            </Box>
         )}

         {stage == 1 && <SelectPlace />}
         {stage == 2 && <UserForm />}
         {stage == 3 && <CardForm />}
         {stage == 4 && <Receipt />}
      </>
   )
}

export default Order
