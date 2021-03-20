import AnswerCardComponent from './AnswerCard';
import * as AnswerUtils from './../utils/answers';
import { Answer } from '../models/answer';

const AnswerListComponent = ({ questionId, answers, isOwnQuestion }) => {
  const answerList = answers.map((answer) =>
    new Answer(
      answer.id,
      answer.byUser.userId,
      answer.answer,
      answer.likes
    ).toJson()
  );

  const deleteAnswer = async (answerId) => {
    await AnswerUtils.deleteAnswer(answerId, questionId, answerList);
  };

  const likeAnswer = async (answerId) => {
    await AnswerUtils.likeAnswer(answerId, questionId, answerList);
  };

  const unlikeAnswer = async (answerId) => {
    await AnswerUtils.unlikeAnswer(answerId, questionId, answerList);
  };

  const updateAnswer = async (answerId, newAnswer) => {
    await AnswerUtils.updateAnswer(questionId, answerId, newAnswer, answerList);
  };

  return (
    <>
      {answers.map((answer) => (
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
        />
      ))}
    </>
  );
};

export default AnswerListComponent;
