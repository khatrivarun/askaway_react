import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import * as QuestionUtils from './../utils/questions';
import QuestionListComponent from './QuestionList';

const UserQuestionListWrapperComponent = ({ uid }) => {
  const [questions, setQuestions] = useState([]);
  const history = useHistory();

  useEffect(() => {
    return QuestionUtils.fetchUsersQuestionsInRealTime(uid).onSnapshot(
      async (snapshot) =>
        setQuestions(await QuestionUtils.convertToQuestionObject(snapshot)),
      (error) => console.log(error)
    );
  }, [uid]);

  const editQuestion = (id) => {
    history.push(`/questions/${id}/update`);
  };

  const deleteQuestion = async (id) => {
    await QuestionUtils.deleteQuestion(id);
  };

  return (
    <QuestionListComponent
      questions={questions}
      userProfileMode={true}
      editQuestion={editQuestion}
      deleteQuestion={deleteQuestion}
    />
  );
};

export default UserQuestionListWrapperComponent;
