import AnswerCardComponent from './AnswerCard';
import * as AnswerUtils from './../utils/answers';
import * as QuestionUtils from './../utils/questions';
import { Answer } from '../models/answer';
import { Flex, Heading, Text, useToast } from '@chakra-ui/react';
import Bugsnag from '@bugsnag/js';
import { NoDataAnimation } from './utility/LottieAnimations';

const AnswerListComponent = ({
  selectedAnswerId,
  questionId,
  answers,
  isOwnQuestion,
}) => {
  const toast = useToast();
  const answerList = answers.map((answer) =>
    new Answer(
      answer.id,
      answer.byUser.userId,
      answer.answer,
      answer.likes
    ).toJson()
  );

  const selectedAnswer = answers.find(
    (answer) => answer.id === selectedAnswerId
  );

  const selectAsMarkedAnswer = async (answerId, userId) => {
    try {
      if (selectedAnswerId !== '') {
        await QuestionUtils.unmarkAnswer(
          questionId,
          selectedAnswer.byUser.userId
        );
      }
      await QuestionUtils.markAnswer(questionId, answerId, userId);

      toast({
        title: 'Success!',
        description: 'Selected as the final answer!',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      Bugsnag.notify(error);
      toast({
        title: 'Error!',
        description: 'Some error has occured! Please try again later!',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const unselectAsMarkedAnswer = async () => {
    try {
      await QuestionUtils.unmarkAnswer(
        questionId,
        selectedAnswer.byUser.userId
      );

      toast({
        title: 'Success!',
        description: 'Unselected as the final answer!',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      Bugsnag.notify(error);
      toast({
        title: 'Error!',
        description: 'Some error has occured! Please try again later!',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const deleteAnswer = async (answerId) => {
    try {
      if (answerId === selectedAnswerId) await unselectAsMarkedAnswer();
      await AnswerUtils.deleteAnswer(answerId, questionId, answerList);

      toast({
        title: 'Success!',
        description: 'Deleted the answer!',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      Bugsnag.notify(error);
      toast({
        title: 'Error!',
        description: 'Some error has occured! Please try again later!',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const likeAnswer = async (answerId) => {
    try {
      await AnswerUtils.likeAnswer(answerId, questionId, answerList);
    } catch (error) {
      Bugsnag.notify(error);
      toast({
        title: 'Error!',
        description: 'Some error has occured! Please try again later!',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const unlikeAnswer = async (answerId) => {
    try {
      await AnswerUtils.unlikeAnswer(answerId, questionId, answerList);
    } catch (error) {
      Bugsnag.notify(error);
      toast({
        title: 'Error!',
        description: 'Some error has occured! Please try again later!',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const updateAnswer = async (answerId, newAnswer) => {
    try {
      await AnswerUtils.updateAnswer(
        questionId,
        answerId,
        newAnswer,
        answerList
      );
    } catch (error) {
      Bugsnag.notify(error);
      toast({
        title: 'Error!',
        description: 'Some error has occured! Please try again later!',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      {selectedAnswerId !== '' && (
        <>
          <Heading>Selected Answer</Heading>
          <AnswerCardComponent
            markedAnswer={true}
            id={selectedAnswer.id}
            user={selectedAnswer.byUser}
            answer={selectedAnswer.answer}
            likes={selectedAnswer.likes}
            updateAnswer={updateAnswer}
            deleteAnswer={deleteAnswer}
            isOwnQuestion={isOwnQuestion}
            likeAnswer={likeAnswer}
            unlikeAnswer={unlikeAnswer}
            markAnswer={selectAsMarkedAnswer}
            unmarkAnswer={unselectAsMarkedAnswer}
          />
        </>
      )}
      <Heading>Answers</Heading>
      {answers.filter((answer) => answer.id !== selectedAnswerId).length > 0 ? (
        answers
          .filter((answer) => answer.id !== selectedAnswerId)
          .map((answer) => (
            <AnswerCardComponent
              key={answer.id}
              id={answer.id}
              user={answer.byUser}
              answer={answer.answer}
              likes={answer.likes}
              updateAnswer={updateAnswer}
              deleteAnswer={deleteAnswer}
              isOwnQuestion={isOwnQuestion}
              likeAnswer={likeAnswer}
              unlikeAnswer={unlikeAnswer}
              markAnswer={selectAsMarkedAnswer}
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
          justify='center'
          align='center'
        >
          <NoDataAnimation />
          <Text>No Data Found!</Text>
        </Flex>
      )}
    </>
  );
};

export default AnswerListComponent;
