import {
  Flex,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';
import AccountDeleteTabComponent from '../components/AccountDeleteTab';
import AccountDetailsTabComponent from '../components/AccountDetailsTab';
import ChangeEmailTabComponent from '../components/ChangeEmailTab';
import ChangePasswordTabComponent from '../components/ChangePasswordTab';
import useFirebaseUser from '../hooks/useFirebaseUser';
import LoadingPage from './Loading';

const AccountEditPage = () => {
  const { loading, user } = useFirebaseUser();
  return !loading ? (
    <Flex
      h='100vh'
      align='flex-start'
      justify='center'
      direction='column'
      mx={50}
    >
      <Tabs variant='soft-rounded' h='80vh' colorScheme='teal'>
        <TabList>
          <Tab>Update User Profile</Tab>
          <Tab>Change Your Email</Tab>
          <Tab>Change Your Password</Tab>
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
