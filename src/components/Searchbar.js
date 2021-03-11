import {
  InputGroup,
  Input,
  InputLeftElement,
  IconButton,
  Box,
} from '@chakra-ui/react';
import { MdSearch } from 'react-icons/md';

const SearchBarComponent = () => {
  return (
    <Box w={500} mx={10}>
      <InputGroup>
        <InputLeftElement
          pointerEvents='none'
          children={
            <IconButton variant='ghost' icon={<MdSearch color='white' />} />
          }
        />
        <Input placeholder='Search Away' textColor='white' />
      </InputGroup>
    </Box>
  );
};

export default SearchBarComponent;
