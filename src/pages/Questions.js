import { Flex } from '@chakra-ui/react';
import CardComponent from '../components/Card';
import NavBarComponent from '../components/NavBar';

const QuestionsPage = () => {
  return (
    <Flex h='100vh' direction='column' m={30}>
      <NavBarComponent />
      <Flex direction='column' m={50} align='center' justify='center'>
        <CardComponent />
        <CardComponent />
        <CardComponent />
        <CardComponent />
      </Flex>
    </Flex>
  );
};

export default QuestionsPage;
