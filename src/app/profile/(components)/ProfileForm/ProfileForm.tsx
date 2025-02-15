'use client'

import { Button, Flex, Input } from '@mantine/core'
import { modals } from '@mantine/modals'
import { Metadata } from 'next'
import { useEffect } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import InputMask from 'react-input-mask'

import { patchProfile } from '@/api'
import { useAuth } from '@/contexts'

import styles from './ProfileForm.module.css'

export const metadata: Metadata = {
   title: 'Профиль - ШИФТ CINEMA'
}

export const ProfileForm = () => {
   const { user, logout, update } = useAuth()

   const {
      register,
      handleSubmit,
      formState: { errors }
   } = useForm({
      defaultValues: {
         lastname: user?.lastname,
         firstname: user?.firstname,
         middlename: user?.middlename,
         phone: user?.phone,
         email: user?.email,
         addres: user?.city
      }
   })

   useEffect(() => {
      // reset()
   }, [user])

   const onSubmit = (data: FieldValues) => {
      console.log(data)
      patchProfile({
         params: {
            profile: {
               firstname: data.firstname,
               middlename: data.middlename,
               lastname: data.lastname,
               email: data.email,
               city: data.addres
            },
            phone: data.phone
         }
      }).then(() => {
         update()
      })
   }

   return (
      <Flex direction="column" gap={24} maw={368} component="form" onSubmit={handleSubmit(onSubmit)}>
         <Input.Wrapper
            label="Фамилия"
            withAsterisk
            error={`${errors.lastname?.type ? errors.lastname?.type : ''}`}
         >
            <Input placeholder="Фамилия" {...register('lastname', { required: true, maxLength: 60 })} />
         </Input.Wrapper>
         <Input.Wrapper
            label="Имя"
            withAsterisk
            error={`${errors.firstname?.type ? errors.firstname?.type : ''}`}
         >
            <Input placeholder="Имя" {...register('firstname', { required: true })} />
         </Input.Wrapper>
         <Input.Wrapper
            label="Отчество"
            withAsterisk
            error={`${errors.middlename?.type ? errors.middlename?.type : ''}`}
         >
            <Input placeholder="Отчество" {...register('middlename', { required: true })} />
         </Input.Wrapper>
         <Input.Wrapper label="Номер телефона">
            <Input
               placeholder="Телефон"
               type="tel"
               component={InputMask}
               disabled={true}
               mask="8 999 999 99 99"
               maskChar=""
               {...register('phone')}
            />
         </Input.Wrapper>
         <Input.Wrapper label="Email">
            <Input placeholder="Email" type="email" {...register('email')} />
         </Input.Wrapper>
         <Input.Wrapper label="Город">
            <Input placeholder="Город" {...register('addres')} />
         </Input.Wrapper>
         <Flex mt={24} gap={24} wrap="wrap-reverse">
            <Button
               variant="default"
               className={styles.btn}
               onClick={() =>
                  modals.openContextModal({
                     modal: 'customConfirmModal',
                     innerProps: {
                        title: 'Вы точно хотите выйти?',
                        cancelText: 'Отменить',
                        confirmText: 'Выйти',
                        onConfirmClick: logout
                     }
                  })
               }
            >
               Выйти
            </Button>
            <Button type="submit" className={styles.btn}>
               Обновить данные
            </Button>
         </Flex>
      </Flex>
   )
}
