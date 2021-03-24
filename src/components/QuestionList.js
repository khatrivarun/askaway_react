import { Flex, Text } from '@chakra-ui/react';
import QuestionCardComponent from './QuestionCard';
import { NoDataAnimation } from './utility/LottieAnimations';

const QuestionListComponent = ({
  questions,
  editQuestion,
  deleteQuestion,
  userProfileMode = false,
  children,
}) => {
  return (
    <Flex direction='column' m={1} align='center' justify='center' w='100%'>
      {questions.length > 0 ? (
        questions.map((question) => (
          <QuestionCardComponent
            key={question.id}
            questionId={question.id}
            question={question.question}
            description={question.description}
            selectedAnswerId={question.selectedAnswerId}
            user={question.byUser}
            likes={question.likes}
            answers={question.answers}
            categories={question.categories}
            editQuestion={editQuestion}
            deleteQuestion={deleteQuestion}
            userProfileMode={userProfileMode}
          />
        ))
      ) : (
        <Flex
          w={{ base: 300, md: 'md', lg: 'lg', xl: '2xl' }}
          borderWidth='1px'
          borderRadius='lg'
          overflow='hidden'
          p={30}
          my={5}
          direction='column'
          align='center'
          justify='center'
        >
          <NoDataAnimation />
          <Text>No Data Found!</Text>
        </Flex>
      )}
      {children}
    </Flex>
  );
};

export default QuestionListComponent;
