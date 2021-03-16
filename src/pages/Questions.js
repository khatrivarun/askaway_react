import { Flex } from '@chakra-ui/react';
import QuestionCardComponent from '../components/QuestionCard';
import NavBarComponent from '../components/NavBar';
import FABComponent from '../components/FAB';

const QuestionsPage = () => {
  return (
    <>
      <Flex h='100vh' direction='column' m={5}>
        <NavBarComponent />
        <Flex direction='column' m={50} align='center' justify='center'>
          <QuestionCardComponent />
          <QuestionCardComponent />
          <QuestionCardComponent />
          <QuestionCardComponent />
        </Flex>
      </Flex>
      <FABComponent />
    </>
  );
};

export default QuestionsPage;
