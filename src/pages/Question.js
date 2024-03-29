import { Button, Flex, Heading, Text } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { Redirect, useHistory } from 'react-router';
import QuestionCardComponent from '../components/QuestionCard';
import LoadingPage from './Loading';
import * as QuestionUtils from './../utils/questions';
import * as AnswerUtils from './../utils/answers';
import * as AuthUtils from './../utils/auth';
import { Question } from '../models/question';
import AnswerListComponent from '../components/AnswerList';
import AnswerFormComponent from '../components/AnswerForm';
import { Answer } from '../models/answer';
import Bugsnag from '@bugsnag/js';
import { IoArrowBack } from 'react-icons/io5';

const QuestionPage = ({ id }) => {
  const [loading, setLoading] = useState(true);
  const [question, setQuestion] = useState(null);
  const [_404, set404] = useState(false);
  const history = useHistory();
  const currentUser = AuthUtils.getCurrentUser();

  useEffect(() => {
    return QuestionUtils.fetchQuestionInRealTime(id).onSnapshot(
      async (question) => {
        if (question.exists) {
          const questionObject = new Question();
          questionObject.fromJson(question.data());

          questionObject.categories = await QuestionUtils.convertKeytoCategories(
            questionObject.categories
          );

          questionObject.answers = await AnswerUtils.getAnswersForQuestion(
            questionObject.answers
          );
          questionObject.byUser = await AuthUtils.getUserFromFirebase(
            questionObject.byUser
          );

          setQuestion(questionObject);
        } else {
          set404(true);
        }
        setLoading(false);
      },
      (error) => Bugsnag.notify(error)
    );
  }, [id]);

  const editQuestion = () => {
    history.push(`/questions/${id}/update`);
  };

  const deleteQuestion = async (id) => {
    try {
      await QuestionUtils.deleteQuestion(id);
    } catch (error) {
      Bugsnag.notify(error);
    }
  };

  const addAnswer = async (answer) => {
    try {
      const answerList = question.answers.map((answer) =>
        new Answer(
          answer.id,
          answer.byUser.userId,
          answer.answer,
          answer.likes
        ).toJson()
      );
      await AnswerUtils.addAnswer(question.id, answer, answerList);
    } catch (error) {
      Bugsnag.notify(error);
    }
  };

  return loading ? (
    <LoadingPage>
      <Text>Fetching the question for you!</Text>
    </LoadingPage>
  ) : !_404 ? (
    <Flex direction='column' m={5}>
      <Button
        leftIcon={<IoArrowBack />}
        colorScheme='white'
        color='teal'
        onClick={() => history.goBack()}
      >
        Go back
      </Button>
      <Flex direction='column' align='center' justify='center'>
        <QuestionCardComponent
          key={question.id}
          questionId={question.id}
          question={question.question}
          description={question.description}
          user={question.byUser}
          likes={question.likes}
          answers={question.answers}
          categories={question.categories}
          editQuestion={editQuestion}
          deleteQuestion={deleteQuestion}
          displayFull={true}
          selectedAnswerId={question.selectedAnswerId}
        />
        <Flex direction='column'>
          <Heading>Your Answer</Heading>
          <AnswerFormComponent addAnswer={addAnswer} />
          <AnswerListComponent
            selectedAnswerId={question.selectedAnswerId}
            answers={question.answers}
            questionId={question.id}
            isOwnQuestion={question.byUser.userId === currentUser.uid}
          />
        </Flex>
      </Flex>
    </Flex>
  ) : (
    <Redirect to='/404' />
  );
};

export default QuestionPage;
