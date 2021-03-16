import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  Button,
  Spinner,
} from '@chakra-ui/react';

import { IoCaretDown } from 'react-icons/io5';
import useFirebaseUser from '../hooks/useFirebaseUser';

const UserDropdownComponent = () => {
  const { loading, user } = useFirebaseUser();
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
        <MenuItem>Add A Question</MenuItem>
        <MenuItem>Update User Details</MenuItem>
        <MenuItem>View Your Profile</MenuItem>
      </MenuList>
    </Menu>
  ) : (
    <Spinner colorScheme='teal' />
  );
};

export default UserDropdownComponent;
