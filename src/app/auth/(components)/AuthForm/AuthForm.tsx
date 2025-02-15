'use client'

import { Button, Flex, Input, Text } from '@mantine/core'
import { useInterval } from '@mantine/hooks'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import InputMask from 'react-input-mask'

import { postOtp, postSignin } from '@/api'
import { useAuth } from '@/contexts'

export const AuthForm = () => {
   const { login } = useAuth()
   const router = useRouter()

   const [stage, setStage] = useState(1)
   const [retryDelay, setRetryDelay] = useState(120000)

   const timer = useInterval(
      () => (retryDelay >= 0 ? setRetryDelay(retryDelay - 1000) : timer.stop()),
      1000
   )
   const {
      register,
      handleSubmit,
      getValues,
      setError,
      formState: { errors }
   } = useForm()

   const requestsOtp = async (phone: string) => {
      const postOtpResponse = await postOtp({ params: { phone } })
      setRetryDelay(postOtpResponse.data.retryDelay)
      timer.start()
   }

   const onSubmit = async (data: FieldValues) => {
      if (stage == 1) {
         requestsOtp(data.phone.replaceAll(' ', ''))
         setStage(2)
      } else {
         try {
            const postSigninRespose = await postSignin({
               params: { phone: data.phone.replaceAll(' ', ''), code: data.code }
            })
            document.cookie = `authToken=${postSigninRespose.data.token}`
            login(postSigninRespose.data.token)
            router.replace('/')
         } catch {
            setError('code', { type: 'invalid' })
         }
      }
   }

   return (
      <>
         <Text>Введите номер телефона для входа в личный кабинет</Text>
         <Flex direction="column" gap={24} maw={368} component="form" onSubmit={handleSubmit(onSubmit)}>
            <Input.Wrapper error={`${errors.phone?.type ? errors.phone?.type : ''}`}>
               <Input
                  placeholder="Телефон"
                  type="tel"
                  component={InputMask}
                  mask="8 999 999 99 99"
                  maskChar=""
                  {...register('phone', { required: true, minLength: 15 })}
               />
            </Input.Wrapper>
            {stage == 2 && (
               <Input.Wrapper error={`${errors.code?.type ? errors.code?.type : ''}`}>
                  <Input
                     placeholder="Проверочный код"
                     component={InputMask}
                     mask="999999"
                     maskChar=""
                     {...register('code', { required: true, minLength: 6 })}
                  />
               </Input.Wrapper>
            )}

            <Button type="submit" mt={16}>
               {stage == 1 && 'Продолжить'}
               {stage == 2 && 'Войти'}
            </Button>
            {stage == 2 &&
               (retryDelay > 0 ? (
                  <Text size="sm" c="#97A1AF">
                     Запросить код повторно можно через {Math.trunc(retryDelay / 1000)} секунд
                  </Text>
               ) : (
                  <Text
                     size="sm"
                     style={{ cursor: 'pointer' }}
                     onClick={() => requestsOtp(getValues('phone').replaceAll(' ', ''))}
                  >
                     Отправить ещё раз
                  </Text>
               ))}
         </Flex>
      </>
   )
}
