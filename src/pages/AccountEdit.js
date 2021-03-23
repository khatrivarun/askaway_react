import {
  Flex,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Button,
} from '@chakra-ui/react';
import { IoArrowBack } from 'react-icons/io5';
import { useHistory } from 'react-router';
import AccountDeleteTabComponent from '../components/AccountDeleteTab';
import AccountDetailsTabComponent from '../components/AccountDetailsTab';
import ChangeEmailTabComponent from '../components/ChangeEmailTab';
import ChangePasswordTabComponent from '../components/ChangePasswordTab';
import useFirebaseUser from '../hooks/useFirebaseUser';
import LoadingPage from './Loading';
import * as AuthUtils from './../utils/auth';

const AccountEditPage = () => {
  const { loading, user } = useFirebaseUser();
  const history = useHistory();
  const userFirebase = AuthUtils.getCurrentUser();

  const isGoogleAccount =
    userFirebase.providerData
      .map((data) => data.providerId)
      .filter((data) => data === 'google.com').length > 0;

  return !loading ? (
    <Flex
      h='100vh'
      align='flex-start'
      justify='flex-start'
      direction='column'
      p={{ base: 0, lg: 25 }}
    >
      <Button
        leftIcon={<IoArrowBack />}
        colorScheme='white'
        color='teal'
        my={5}
        onClick={() => history.goBack()}
      >
        Go back
      </Button>
      <Tabs variant='soft-rounded' colorScheme='teal'>
        <TabList>
          <Tab>Update User Profile</Tab>
          {!isGoogleAccount && (
            <>
              <Tab>Change Your Email</Tab>
              <Tab>Change Your Password</Tab>
            </>
          )}
          <Tab>Delete Your Account</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <AccountDetailsTabComponent user={user} />
          </TabPanel>
          <TabPanel>
            <ChangeEmailTabComponent user={user} />
          </TabPanel>
          <TabPanel>
            <ChangePasswordTabComponent />
          </TabPanel>
          <TabPanel>
            <AccountDeleteTabComponent user={user} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  ) : (
    <LoadingPage>
      <Text>Fetching Your Details...</Text>
    </LoadingPage>
  );
};

export default AccountEditPage;
