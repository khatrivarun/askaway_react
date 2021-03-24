import { Flex, Link, Text } from '@chakra-ui/react';
import { Server500Animation } from '../components/utility/LottieAnimations';

const _500Page = ({ children }) => {
  return (
    <Flex h='100vh' align='center' justify='center' direction='column' m={30}>
      <Server500Animation />
      {children ? (
        children
      ) : (
        <>
          <Text>
            Oopsie! The application has encountered an error and is now
            reported!
          </Text>
          <Link href='/'>Go back to homepage</Link>
        </>
      )}
    </Flex>
  );
};

export default _500Page;
