'use client'

import {
   ActionIcon,
   Box,
   Flex,
   Text,
   useMantineColorScheme
} from '@mantine/core'
import Image from 'next/image'
import Link from 'next/link'

import { ROUTES } from '@/constants/routes'
import { useAuth } from '@/contexts'
import { LoginIcon } from '@/icons/LoginIcon'
import { TicketIcon } from '@/icons/TicketIcon'
import { UserIcon } from '@/icons/UserIcon'

import styles from './Navigation.module.css'

export const Navigation = () => {
   const { user } = useAuth()
   const theme = useMantineColorScheme()
   const localTheme = localStorage.getItem('mantine-color-scheme-value')
   console.log(localTheme)
   return (
      <Box component="nav" className={styles.nav}>
         <Flex align="center" justify="space-between" gap={32} className={styles.container}>
            <Flex align="center" gap={32}>
               <Flex align="end" component={Link} href={ROUTES.ROOT}>
                  <Box>
                     <Text c="#9534D2" fw={600} size="14px" lh="17px">
                        Шифт
                     </Text>
                     <Text c="#9534D2" fw={600} size="14px" lh="17px">
                        CINEMA
                     </Text>
                  </Box>
                  <Image
                     src="/Logo.svg"
                     width={61}
                     height={38}
                     alt="logo"
                     style={{ transform: 'translate(-8px)' }}
                  />
               </Flex>
               {user && (
                  <Flex align="center" gap={16} component={Link} href={ROUTES.PROFILE}>
                     <UserIcon fill={theme.colorScheme == 'dark' ? 'white' : ''} />
                     <Text>Профиль</Text>
                  </Flex>
               )}
               {user && (
                  <Flex align="center" gap={16} component={Link} href={ROUTES.ORDERS}>
                     <TicketIcon fill={theme.colorScheme == 'dark' ? 'white' : ''} />
                     <Text>Билеты</Text>
                  </Flex>
               )}
            </Flex>
            <Flex align="center" gap={32}>
               {
                  <ActionIcon
                     variant="default"
                     aria-label="Theme"
                     onClick={theme.toggleColorScheme}
                  ></ActionIcon>
               }
               {!user && (
                  <Flex align="center" gap={16} component={Link} href={ROUTES.AUTH}>
                     <LoginIcon fill={theme.colorScheme == 'dark' ? 'white' : ''} />
                     <Text>Войти</Text>
                  </Flex>
               )}
            </Flex>
         </Flex>
      </Box>
   )
}
