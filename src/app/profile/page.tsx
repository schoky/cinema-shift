import { Flex, Title } from '@mantine/core'
import { Metadata } from 'next'

import { ProfileForm } from './(components)/ProfileForm/ProfileForm'

export const metadata: Metadata = {
   title: 'Профиль - ШИФТ CINEMA'
}

const Profile = async () => (
   <Flex direction="column" gap={24} mt={48}>
      <Title order={2}>Профиль</Title>
      <ProfileForm />
   </Flex>
)

export default Profile
