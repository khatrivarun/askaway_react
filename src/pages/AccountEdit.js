import { Flex, Text } from '@chakra-ui/react';
import useFirebaseUser from '../hooks/useFirebaseUser';
import LoadingPage from './Loading';

const AccountEditPage = () => {
  const { loading, user } = useFirebaseUser();
  return !loading ? (
    <Flex h='100vh' align='center' direction='column' m={30}>
      {user.displayName}
    </Flex>
  ) : (
    <LoadingPage>
      <Text>Fetching Your Details...</Text>
    </LoadingPage>
  );
};

export default AccountEditPage;
