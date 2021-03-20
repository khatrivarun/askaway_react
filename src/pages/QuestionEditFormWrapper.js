import { Text } from '@chakra-ui/layout';
import { Redirect } from 'react-router';
import useQuestion from '../hooks/useQuestion';
import LoadingPage from './Loading';
import QuestionsFormPage from './QuestionsForm';
import * as QuestionUtils from './../utils/questions';

const QuestionEditFormWrapperPage = ({ id }) => {
  const { loading, question, error } = useQuestion(id);

  return loading ? (
    <LoadingPage>
      <Text>Fetching the question for you!</Text>
    </LoadingPage>
  ) : !error ? (
    <QuestionsFormPage
      isEdit={true}
      fromLink={true}
      questionId={question.id}
      question={question.question}
      description={question.description}
      questionCategories={QuestionUtils.convertKeytoCategories(
        question.categories
      )}
    />
  ) : (
    <Redirect to='/404' />
  );
};

export default QuestionEditFormWrapperPage;
