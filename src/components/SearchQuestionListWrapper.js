import Bugsnag from '@bugsnag/js';
import { Text } from '@chakra-ui/react';
import { useHistory } from 'react-router';
import * as QuestionUtils from './../utils/questions';
import QuestionListComponent from './QuestionList';

const SearchQuestionListWrapperComponent = ({ questions }) => {
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

  return questions.length > 0 ? (
    <QuestionListComponent
      questions={questions}
      userProfileMode={true}
      editQuestion={editQuestion}
      deleteQuestion={deleteQuestion}
    />
  ) : (
    <Text>No results</Text>
  );
};

export default SearchQuestionListWrapperComponent;
