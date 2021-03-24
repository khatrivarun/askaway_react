import { Flex, Link, Text } from '@chakra-ui/react';
import { NotFound404Animation } from '../components/utility/LottieAnimations';

const _404Page = ({ children }) => {
  return (
    <Flex h='100vh' align='center' justify='center' direction='column' m={30}>
      <NotFound404Animation />
      {children ? (
        children
      ) : (
        <>
          <Text>Are you sure you are on the right website?</Text>
          <Link href='/'>Go back to homepage</Link>
        </>
      )}
    </Flex>
  );
};

export default _404Page;
