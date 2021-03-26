import { useState, useEffect } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import NavBarComponent from '../components/NavBar';
import FABComponent from '../components/FAB';
import QuestionsFormPage from './QuestionsForm';
import * as QuestionUtils from './../utils/questions';
import QuestionListComponent from '../components/QuestionList';
import Bugsnag from '@bugsnag/js';
import CategoryTilesListComponent from '../components/CategoryTilesList';
import TopContributorsListComponent from '../components/TopContributorsList';

const QuestionsPage = () => {
  const [isQuestionFormOpen, setQuestionFormOpen] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [question, setQuestion] = useState('');
  const [questionId, setQuestionId] = useState('');
  const [description, setDescription] = useState('');
  const [questionCategories, setQuestionCategories] = useState([]);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    return QuestionUtils.questionStream().onSnapshot(
      async (querySnapshot) =>
        setQuestions(
          await QuestionUtils.convertToQuestionObject(querySnapshot)
        ),
      (error) => Bugsnag.notify(error)
    );
  }, []);

  const closeQuestionForm = () => {
    setQuestion('');
    setDescription('');
    setQuestionId('');
    setEdit(false);
    setQuestionCategories([]);
    setQuestionFormOpen(false);
  };
  const openQuestionForm = () => setQuestionFormOpen(true);

  const editQuestion = (question, description, id, categories) => {
    setQuestion(question);
    setDescription(description);
    setQuestionId(id);
    setQuestionCategories(categories);
    setEdit(true);
    openQuestionForm();
  };

  const deleteQuestion = async (id) => {
    try {
      await QuestionUtils.deleteQuestion(id);
    } catch (error) {
      Bugsnag.notify(error);
    }
  };

  return !isQuestionFormOpen ? (
    <>
      <Flex direction='column' m={5}>
        <NavBarComponent />
        <CategoryTilesListComponent />
        <Flex direction={{ base: 'column', lg: 'row' }}>
          <Box flex={{ base: 1, lg: 5 }}>
            <QuestionListComponent
              questions={questions}
              editQuestion={editQuestion}
              deleteQuestion={deleteQuestion}
            >
              <FABComponent onClick={openQuestionForm} />
            </QuestionListComponent>
          </Box>
          <Box flex={1}>
            <TopContributorsListComponent />
          </Box>
        </Flex>
      </Flex>
    </>
  ) : (
    <QuestionsFormPage
      questionId={questionId}
      question={question}
      description={description}
      questionCategories={questionCategories}
      onCloseForm={closeQuestionForm}
      isOpen={isQuestionFormOpen}
      isEdit={isEdit}
    />
  );
};

export default QuestionsPage;
