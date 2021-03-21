import { Flex, Heading, Text } from '@chakra-ui/react';
import { Redirect } from 'react-router';
import NavBarComponent from '../components/NavBar';
import UserCardComponent from '../components/UserCard';
import UserQuestionListWrapperComponent from '../components/UserQuestionListWrapper';
import useFirebaseUser from '../hooks/useFirebaseUser';
import * as AuthUtils from './../utils/auth';
import LoadingPage from './Loading';

const UserProfilePage = ({ uid = AuthUtils.getCurrentUser().uid }) => {
  const { error, loading, user } = useFirebaseUser(uid);
  return !loading ? (
    !error ? (
      <Flex direction='column' m={5}>
        <NavBarComponent />
        <Flex direction='column' align='center'>
          <UserCardComponent uid={user.userId} />
          <Heading textAlign='center'>
            Questions asked by {user.displayName}
          </Heading>
          <UserQuestionListWrapperComponent uid={user.userId} />
        </Flex>
      </Flex>
    ) : (
      <Redirect to='/404' />
    )
  ) : (
    <LoadingPage>
      <Text>Fetching user details!</Text>
    </LoadingPage>
  );
};

export default UserProfilePage;
