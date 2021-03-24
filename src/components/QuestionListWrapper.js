import Bugsnag from '@bugsnag/js';
import { useHistory } from 'react-router';
import * as QuestionUtils from '../utils/questions';
import QuestionListComponent from './QuestionList';

const QuestionListWrapperComponent = ({ questions }) => {
  const history = useHistory();

  const editQuestion = (id) => {
    history.push(`/questions/${id}/update`);
  };

  const deleteQuestion = async (id) => {
    try {
      await QuestionUtils.deleteQuestion(id);
    } catch (error) {
      Bugsnag.notify(error);
    }
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

export default QuestionListWrapperComponent;
