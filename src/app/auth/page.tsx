import { Flex, Title } from '@mantine/core'

import { AuthForm } from './(components)/AuthForm/AuthForm'

const Auth = () => (
   <Flex direction="column" gap={24} mt={48}>
      <Title order={2}>Авторизация</Title>
      <AuthForm />
   </Flex>
)

export default Auth
