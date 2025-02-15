'use client'

import { Button, Flex, Input } from '@mantine/core'
import { FieldValues, useForm } from 'react-hook-form'
import InputMask from 'react-input-mask'

import { VALIDATION_ERRORS } from '@/constants/validationErrors'
import { useAuth, useOrder } from '@/contexts'

export const UserForm = () => {
   const { details, stage, setStage } = useOrder()
   const { user } = useAuth()

   const {
      register,
      handleSubmit,
      formState: { errors }
   } = useForm({
      defaultValues: {
         lastname: user?.lastname,
         firstname: user?.firstname,
         phone: user?.phone + '    ',
         email: user?.email,
         addres: user?.city
      }
   })

   const onSubmit = (data: FieldValues) => {
      details.person.firstname = data.firstname
      details.person.lastname = data.lastname
      details.person.phone = data.phone.split(' ').join('')
      setStage(stage + 1)
   }

   return (
      <Flex
         direction="column"
         gap={24}
         mt={24}
         w="100%"
         maw={368}
         component="form"
         onSubmit={handleSubmit(onSubmit)}
      >
         <Input.Wrapper
            label="Фамилия"
            withAsterisk
            error={`${errors.lastname?.type ? (VALIDATION_ERRORS[errors.lastname?.type as string] ? VALIDATION_ERRORS[errors.lastname?.type as string] : errors.lastname?.type) : ''}`}
         >
            <Input placeholder="Фамилия" {...register('lastname', { required: true, maxLength: 60 })} />
         </Input.Wrapper>
         <Input.Wrapper
            label="Имя"
            withAsterisk
            error={`${errors.firstname?.type ? (VALIDATION_ERRORS[errors.firstname?.type as string] ? VALIDATION_ERRORS[errors.firstname?.type as string] : errors.firstname?.type) : ''}`}
         >
            <Input placeholder="Имя" {...register('firstname', { required: true })} />
         </Input.Wrapper>
         <Input.Wrapper
            label="Номер телефона"
            withAsterisk
            error={`${errors.phone?.type ? (VALIDATION_ERRORS[errors.phone?.type as string] ? VALIDATION_ERRORS[errors.phone?.type as string] : errors.phone?.type) : ''}`}
         >
            <Input
               placeholder="Телефон"
               type="tel"
               component={InputMask}
               mask="8 999 999 99 99"
               maskChar=""
               {...register('phone', { required: true, minLength: 15 })}
            />
         </Input.Wrapper>
         <Input.Wrapper label="Email">
            <Input placeholder="Email" type="email" {...register('email')} />
         </Input.Wrapper>
         <Input.Wrapper label="Адрес">
            <Input placeholder="Адрес" {...register('addres')} />
         </Input.Wrapper>
         <Flex mt={24} gap={24} wrap="wrap-reverse">
            <Button variant="default" miw={170} flex={1} onClick={() => setStage(stage - 1)}>
               Назад
            </Button>
            <Button miw={170} flex={1} type="submit">
               Продолжить
            </Button>
         </Flex>
      </Flex>
   )
}
