import { IconButton, Flex, useDisclosure } from '@chakra-ui/react';
import { MdMenu } from 'react-icons/md';
import DrawerComponent from './Drawer';
import SearchBarComponent from './Searchbar';
import UserDropdownComponent from './UserDropdown';

const NavBarComponent = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Flex
        justify='space-between'
        align='center'
        bgColor='teal'
        borderWidth='1px'
        borderRadius='lg'
        p={{ base: 1, lg: 3 }}
      >
        <IconButton
          variant='ghost'
          icon={<MdMenu color='white' />}
          onClick={onOpen}
        />
        <SearchBarComponent />
        <UserDropdownComponent />
      </Flex>
      <DrawerComponent isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default NavBarComponent;
