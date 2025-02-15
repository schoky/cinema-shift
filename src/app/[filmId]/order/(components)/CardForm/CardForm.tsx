'use client'

import { Box, Button, Card, Flex, Input } from '@mantine/core'
import { FieldValues, useForm } from 'react-hook-form'
import InputMask from 'react-input-mask'

import { VALIDATION_ERRORS } from '@/constants/validationErrors'
import { useOrder } from '@/contexts'

export const CardForm = () => {
   const { details, stage, setStage } = useOrder()
   const {
      register,
      handleSubmit,
      formState: { errors }
   } = useForm()

   const onSubmit = (data: FieldValues) => {
      details.debitCard.pan = data.pan
      details.debitCard.expireDate = data.expireDate
      details.debitCard.cvv = data.cvv

      setStage(stage + 1)
   }

   return (
      <Box component="form" maw={368} onSubmit={handleSubmit(onSubmit)}>
         <Card mt={24} bg="light-dark(#F3F4F6, var(--mantine-color-dark-6))" component="form" w="100%">
            <Input.Wrapper
               label="Номер"
               withAsterisk
               error={`${errors.pan?.type ? (VALIDATION_ERRORS[errors.pan?.type as string] ? VALIDATION_ERRORS[errors.pan?.type as string] : errors.pan?.type) : ''}`}
            >
               <Input
                  placeholder="0000 0000"
                  component={InputMask}
                  mask="9999 9999"
                  maskChar=""
                  {...register('pan', { required: true, minLength: 9 })}
               />
            </Input.Wrapper>
            <Flex gap={24} mt={16}>
               <Input.Wrapper
                  label="Срок"
                  withAsterisk
                  error={`${errors.expireDate?.type ? (VALIDATION_ERRORS[errors.expireDate?.type as string] ? VALIDATION_ERRORS[errors.expireDate?.type as string] : errors.expireDate?.type) : ''}`}
               >
                  <Input
                     placeholder="00/00"
                     component={InputMask}
                     mask="99/99"
                     maskChar=""
                     {...register('expireDate', { required: true, minLength: 5 })}
                  />
               </Input.Wrapper>
               <Input.Wrapper
                  label="CVV"
                  withAsterisk
                  error={`${errors.cvv?.type ? (VALIDATION_ERRORS[errors.cvv?.type as string] ? VALIDATION_ERRORS[errors.cvv?.type as string] : errors.cvv?.type) : ''}`}
               >
                  <Input
                     placeholder="000"
                     component={InputMask}
                     mask="999"
                     maskChar=""
                     {...register('cvv', { required: true, minLength: 3 })}
                  />
               </Input.Wrapper>
            </Flex>
         </Card>
         <Flex mt={24} gap={24} wrap="wrap-reverse">
            <Button variant="default" miw={160} flex={1} onClick={() => setStage(stage - 1)}>
               Назад
            </Button>
            <Button miw={160} flex={1} type="submit">
               Оплатить
            </Button>
         </Flex>
      </Box>
   )
}
