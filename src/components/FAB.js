import { IconButton, Box } from '@chakra-ui/react';
import { IoAdd } from 'react-icons/io5';

const FABComponent = () => {
  return (
    <Box position='fixed' right={10} bottom={10}>
      <IconButton
        size='lg'
        isRound={true}
        colorScheme='teal'
        icon={<IoAdd />}
      />
    </Box>
  );
};

export default FABComponent;
