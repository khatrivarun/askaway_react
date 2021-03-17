import { IconButton, Box } from '@chakra-ui/react';
import { IoAdd } from 'react-icons/io5';

const FABComponent = ({ onClick }) => {
  return (
    <Box position='fixed' right={10} bottom={10}>
      <IconButton
        size='lg'
        isRound={true}
        colorScheme='teal'
        icon={<IoAdd />}
        onClick={onClick}
      />
    </Box>
  );
};

export default FABComponent;
