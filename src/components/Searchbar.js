import {
  InputGroup,
  Input,
  InputLeftElement,
  IconButton,
  Text,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useDisclosure,
  CloseButton,
  Divider,
  Button,
  useColorMode,
} from '@chakra-ui/react';
import { useState } from 'react';
import { MdSearch } from 'react-icons/md';
import { useHistory } from 'react-router';

const SearchBarComponent = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchQuery, setSearchQuery] = useState('');
  const history = useHistory();
  const { colorMode } = useColorMode();
  return (
    <>
      <Flex
        w={{ base: 150, md: 'md', lg: 'lg', xl: '2xl' }}
        borderWidth='1px'
        borderRadius='lg'
        p={1}
        m={1}
        align='center'
        justify='center'
        cursor='pointer'
        onClick={onOpen}
      >
        <MdSearch color='white' />
        <Text color='white'>SearchAway</Text>
      </Flex>
      <Modal isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <Flex align='flex-start' justify='center' direction='column' m={5}>
              <CloseButton onClick={onClose} mb={5} />
              <InputGroup>
                <InputLeftElement
                  pointerEvents='none'
                  children={
                    <IconButton
                      variant='ghost'
                      icon={<MdSearch color='white' />}
                    />
                  }
                />
                <Input
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder='Search Away'
                  textColor={colorMode === 'light' ? 'black' : 'white'}
                />
              </InputGroup>
              {searchQuery !== '' && (
                <Flex
                  direction='column'
                  my={5}
                  w='100%'
                  borderWidth='1px'
                  borderRadius='lg'
                >
                  <Button
                    variant='unstyled'
                    onClick={() =>
                      history.push(`/search/account/${searchQuery}`)
                    }
                  >
                    Search for users named "{searchQuery}"
                  </Button>
                  <Divider />
                  <Button
                    variant='unstyled'
                    onClick={() =>
                      history.push(`/search/questions/${searchQuery}`)
                    }
                  >
                    Search for questions with "{searchQuery}"
                  </Button>
                </Flex>
              )}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SearchBarComponent;
