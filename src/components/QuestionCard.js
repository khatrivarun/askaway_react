import { Box, Text, Flex, Button } from '@chakra-ui/react';
import { IoHeart, IoList } from 'react-icons/io5';

const QuestionCardComponent = () => {
  return (
    <Box
      w={{ base: 300, md: 'md', lg: 'lg', xl: 'xl' }}
      borderWidth='1px'
      borderRadius='lg'
      overflow='hidden'
      p={30}
      my={5}
    >
      <Text color='gray'>Username asks the following question</Text>
      <Text fontSize='2xl' fontWeight='bold'>
        Sample Question
      </Text>
      <Flex direction='row' justify='space-between'>
        <Button
          variant='ghost'
          colorScheme='teal'
          leftIcon={<IoHeart color='teal' />}
        >
          38 Noices
        </Button>
        <Button
          variant='ghost'
          colorScheme='teal'
          leftIcon={<IoList color='teal' />}
        >
          69 Answers
        </Button>
      </Flex>
    </Box>
  );
};

export default QuestionCardComponent;
