import { Flex, Heading, IconButton, useColorMode } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { IoArrowBackSharp } from 'react-icons/io5';
import { useHistory } from 'react-router';
import QuestionListWrapperComponent from '../components/QuestionListWrapper';
import categories from '../constants/categories';
import * as QuestionUtils from './../utils/questions';

const CategoryQuestionsPage = ({ category }) => {
  const [questions, setQuestions] = useState([]);
  const { colorMode } = useColorMode();
  const history = useHistory();

  useEffect(
    () =>
      QuestionUtils.categoricalQuestionInRealTime(category).onSnapshot(
        async (snapshot) =>
          setQuestions(await QuestionUtils.convertToQuestionObject(snapshot)),
        (error) => console.log(error)
      ),
    [category]
  );

  return (
    <Flex direction='column' m={25}>
      <Flex direction='row'>
        <IconButton
          size='lg'
          icon={<IoArrowBackSharp />}
          colorScheme='white'
          color={colorMode === 'light' ? 'black' : 'white'}
          onClick={() => {
            history.goBack();
          }}
        />
        <Heading>
          Questions belonging to{' '}
          {categories.find((c) => c.key === category).title}
        </Heading>
      </Flex>
      <QuestionListWrapperComponent questions={questions} />
    </Flex>
  );
};

export default CategoryQuestionsPage;
