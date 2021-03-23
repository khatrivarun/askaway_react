import AnswerCardComponent from './AnswerCard';
import * as AnswerUtils from './../utils/answers';
import * as QuestionUtils from './../utils/questions';
import { Answer } from '../models/answer';
import { Heading } from '@chakra-ui/layout';
import Bugsnag from '@bugsnag/js';

const AnswerListComponent = ({
  selectedAnswerId,
  questionId,
  answers,
  isOwnQuestion,
}) => {
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

  const deleteAnswer = async (answerId) => {
    try {
      await AnswerUtils.deleteAnswer(answerId, questionId, answerList);
    } catch (error) {
      Bugsnag.notify(error);
    }
  };

  const likeAnswer = async (answerId) => {
    try {
      await AnswerUtils.likeAnswer(answerId, questionId, answerList);
    } catch (error) {
      Bugsnag.notify(error);
    }
  };

  const unlikeAnswer = async (answerId) => {
    try {
      await AnswerUtils.unlikeAnswer(answerId, questionId, answerList);
    } catch (error) {
      Bugsnag.notify(error);
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
    }
  };

  const selectAsMarkedAnswer = async (answerId, userId) => {
    try {
      if (selectedAnswerId !== '') {
        await QuestionUtils.unmarkAnswer(
          questionId,
          selectedAnswer.byUser.userId
        );
      }
      await QuestionUtils.markAnswer(questionId, answerId, userId);
    } catch (error) {
      Bugsnag.notify(error);
    }
  };

  const unselectAsMarkedAnswer = async () => {
    try {
      await QuestionUtils.unmarkAnswer(
        questionId,
        selectedAnswer.byUser.userId
      );
    } catch (error) {
      Bugsnag.notify(error);
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
      {answers
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
        ))}
    </>
  );
};

export default AnswerListComponent;
