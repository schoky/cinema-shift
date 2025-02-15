'use client'

import { Button, Flex, Image, Title } from '@mantine/core'
import type { ContextModalProps } from '@mantine/modals'

interface ConfirmModalProps {
   title: string
   cancelText: string
   onCancelClick: () => void
   confirmText: string
   onConfirmClick: () => void
}

export const ConfirmModal = ({ context, id, innerProps }: ContextModalProps<ConfirmModalProps>) => (
   <Flex direction="column" align="center" maw={400}>
      <Image src="/Question.jpg" w={56} />
      <Title order={3} mt={16}>
         {innerProps.title}
      </Title>
      <Button
         variant="outline"
         mt={40}
         w="100%"
         onClick={() => {
            if (innerProps.onCancelClick) innerProps.onCancelClick()
            context.closeModal(id)
         }}
      >
         {innerProps.cancelText}
      </Button>
      <Button
         mt={16}
         w="100%"
         onClick={() => {
            if (innerProps.onConfirmClick) innerProps.onConfirmClick()
            context.closeModal(id)
         }}
      >
         {innerProps.confirmText}
      </Button>
   </Flex>
)
