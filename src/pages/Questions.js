import { useState, useEffect } from 'react';
import { Flex } from '@chakra-ui/react';
import QuestionCardComponent from '../components/QuestionCard';
import NavBarComponent from '../components/NavBar';
import FABComponent from '../components/FAB';
import QuestionsFormPage from './QuestionsForm';
import * as AuthUtils from './../utils/questions';

const QuestionsPage = () => {
  const [isQuestionFormOpen, setQuestionFormOpen] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [question, setQuestion] = useState('');
  const [questionId, setQuestionId] = useState('');
  const [description, setDescription] = useState('');
  const [questionCategories, setQuestionCategories] = useState([]);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    return AuthUtils.questionStream().onSnapshot(
      async (querySnapshot) =>
        setQuestions(await AuthUtils.convertToQuestionObject(querySnapshot)),
      (error) => console.log(error)
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
    await AuthUtils.deleteQuestion(id);
  };

  return !isQuestionFormOpen ? (
    <>
      <Flex direction='column' m={5}>
        <NavBarComponent />
        <Flex direction='column' m={50} align='center' justify='center'>
          {questions.map((question) => (
            <QuestionCardComponent
              questionId={question.id}
              question={question.question}
              description={question.description}
              user={question.byUser}
              likes={question.likes}
              answers={question.answers}
              categories={question.categories}
              editQuestion={editQuestion}
              deleteQuestion={deleteQuestion}
            />
          ))}
        </Flex>
      </Flex>
      <FABComponent onClick={openQuestionForm} />
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
