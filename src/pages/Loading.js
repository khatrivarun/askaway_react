import { Flex, Text } from '@chakra-ui/react';
import { LoadingAnimation } from '../components/utility/LottieAnimations';

const LoadingPage = ({ children }) => {
  return (
    <Flex
      h='100vh'
      w='100%'
      align='center'
      justify='center'
      direction='column'
      m={30}
    >
      <LoadingAnimation />
      {children ? children : <Text>Welcome to AskAway!</Text>}
    </Flex>
  );
};

export default LoadingPage;
