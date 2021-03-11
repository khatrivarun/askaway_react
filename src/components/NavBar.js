import { IconButton, Flex, Text, useDisclosure } from '@chakra-ui/react';
import { MdMenu } from 'react-icons/md';
import DrawerComponent from './Drawer';
import SearchBarComponent from './Searchbar';

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
        p={3}
      >
        <IconButton
          variant='ghost'
          icon={<MdMenu color='white' />}
          onClick={onOpen}
        />
        <SearchBarComponent />
        <Text color='white'>Your Name Here</Text>
      </Flex>
      <DrawerComponent isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default NavBarComponent;
