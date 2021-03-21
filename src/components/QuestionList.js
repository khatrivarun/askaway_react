import { Flex } from '@chakra-ui/react';
import QuestionCardComponent from './QuestionCard';

const QuestionListComponent = ({
  questions,
  editQuestion,
  deleteQuestion,
  userProfileMode = false,
  children,
}) => {
  return (
    <Flex direction='column' m={1} align='center' justify='center'>
      {questions.map((question) => (
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
      ))}
      {children}
    </Flex>
  );
};

export default QuestionListComponent;
