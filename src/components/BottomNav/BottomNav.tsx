'use client'

import { Flex, Text, useMantineColorScheme } from '@mantine/core'
import Link from 'next/link'

import { ROUTES } from '@/constants/routes'
import { MovieIcon } from '@/icons/MovieIcon'
import { TicketIcon } from '@/icons/TicketIcon'
import { UserIcon } from '@/icons/UserIcon'

import styles from './BottomNav.module.css'

export const BottomNav = () => {
   const theme = useMantineColorScheme()

   return (
      <Flex className={styles.bottom_nav}>
         <Flex
            direction="column"
            justify="center"
            align="center"
            flex={1}
            h={57}
            component={Link}
            href={ROUTES.ROOT}
         >
            <MovieIcon fill={theme.colorScheme == 'dark' ? 'white' : ''} />
            <Text size="10px" lh="12px" c="#637083">
               Афиша
            </Text>
         </Flex>
         <Flex
            direction="column"
            justify="center"
            align="center"
            flex={1}
            h={57}
            component={Link}
            href={ROUTES.ORDERS}
         >
            <TicketIcon fill={theme.colorScheme == 'dark' ? 'white' : ''} />
            <Text size="10px" lh="12px" c="#637083">
               Билеты
            </Text>
         </Flex>
         <Flex
            direction="column"
            justify="center"
            align="center"
            flex={1}
            h={57}
            component={Link}
            href={ROUTES.PROFILE}
         >
            <UserIcon fill={theme.colorScheme == 'dark' ? 'white' : ''} />
            <Text size="10px" lh="12px" c="#637083">
               Профиль
            </Text>
         </Flex>
      </Flex>
   )
}
