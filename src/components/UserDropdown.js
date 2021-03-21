import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  Button,
  Spinner,
  useColorMode,
} from '@chakra-ui/react';

import { IoCaretDown } from 'react-icons/io5';
import { useHistory } from 'react-router';
import * as AuthUtils from './../utils/auth';
import useFirebaseUser from '../hooks/useFirebaseUser';

const UserDropdownComponent = () => {
  const history = useHistory();
  const { loading, user } = useFirebaseUser();
  const { colorMode, toggleColorMode } = useColorMode();
  return !loading ? (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<IoCaretDown />}
        w={{ base: 300, md: 150 }}
        bgColor='teal'
        color='white'
      >
        <Text fontSize={{ base: 'xs', md: 'sm' }}>{user.displayName}</Text>
      </MenuButton>
      <MenuList>
        <MenuItem onClick={toggleColorMode}>
          Change to {colorMode === 'light' ? 'dark' : 'light'} mode
        </MenuItem>
        <MenuItem onClick={() => history.push('/questions/new')}>
          Add A Question
        </MenuItem>
        <MenuItem onClick={() => history.push('/account/edit')}>
          Update User Details
        </MenuItem>
        <MenuItem onClick={() => history.push('/account/me')}>
          View Your Profile
        </MenuItem>
        <MenuItem onClick={async () => await AuthUtils.logout()}>
          Log Out
        </MenuItem>
      </MenuList>
    </Menu>
  ) : (
    <Spinner />
  );
};

export default UserDropdownComponent;
