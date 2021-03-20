import {
  Box,
  Flex,
  Heading,
  Checkbox,
  Wrap,
  IconButton,
  SlideFade,
  FormLabel,
  FormControl,
  FormErrorMessage,
  Button,
  useColorMode,
} from '@chakra-ui/react';
import { IoArrowBackSharp } from 'react-icons/io5';
import { useFormik } from 'formik';
import FormfieldComponent from '../components/Formfield';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import categories from '../constants/categories';
import { useHistory } from 'react-router-dom';
import * as QuestionUtils from './../utils/questions';

const QuestionsFormPage = ({
  questionId = '',
  question = '',
  description = '',
  questionCategories = [],
  fromLink = false,
  isEdit = false,
  isOpen = true,
  onCloseForm,
}) => {
  console.log(questionCategories);
  const [categoryKeys, setCategoryKeys] = useState([]);
  const [isCategoriesValid, setCategoriesValid] = useState(false);
  const [categoriesErrorMessage, setCategoriesErrorMessage] = useState('');
  const history = useHistory();
  const { colorMode } = useColorMode();

  useEffect(() => {
    if (questionCategories.length !== 0) {
      const keys = questionCategories.map((category) => category.key);
      setCategoryKeys(keys);
    }
  }, [questionCategories, isEdit]);

  const onSubmit = async (values) => {
    if (categoryKeys.length === 0) {
      setCategoriesErrorMessage(
        'Please select categories your question belongs to'
      );
      setCategoriesValid(false);

      return;
    } else {
      setCategoriesErrorMessage('');
      setCategoriesValid(true);
    }
    if (!isEdit) {
      await QuestionUtils.addQuestion(
        values.question,
        values.description,
        categoryKeys
      );
    } else {
      await QuestionUtils.updateQuestion(
        questionId,
        values.question,
        values.description,
        categoryKeys
      );
    }

    if (fromLink) {
      history.goBack();
    } else {
      onCloseForm();
    }
  };

  const formik = useFormik({
    initialValues: {
      question: question,
      description: description,
    },
    validationSchema: yup.object().shape({
      question: yup.string().required().min(20),
      description: yup.string().required().min(20),
    }),
    onSubmit: onSubmit,
  });

  return (
    <SlideFade in={isOpen} offsetY='500px'>
      <Flex direction='column' m={25}>
        <Flex direction='row' align='center'>
          <IconButton
            size='lg'
            icon={<IoArrowBackSharp />}
            colorScheme='white'
            color={colorMode === 'light' ? 'black' : 'white'}
            onClick={() => {
              if (fromLink) {
                history.goBack();
              } else {
                onCloseForm();
              }
            }}
          />
          <Heading color='teal'>
            {!isEdit ? 'Add a new question' : 'Update your question'}
          </Heading>
        </Flex>
        <Box m={25}>
          <FormfieldComponent
            label='Question'
            placeholder='Your Question'
            error={formik.errors.question}
            type='text'
            value={formik.values.question}
            handleChange={formik.handleChange('question')}
          />
          <FormfieldComponent
            label='Description'
            placeholder='Your Description'
            isTextField={true}
            error={formik.errors.description}
            type='text'
            value={formik.values.description}
            handleChange={formik.handleChange('description')}
          />
          <Box m={5}>
            <FormControl isRequired={true} isInvalid={!isCategoriesValid}>
              <FormLabel>Categories</FormLabel>
              <Wrap>
                {categories.map((category) => (
                  <Checkbox
                    m={3}
                    key={category.key}
                    value={category.key}
                    isChecked={categoryKeys.indexOf(category.key) !== -1}
                    onChange={() => {
                      if (categoryKeys.indexOf(category.key) === -1) {
                        setCategoryKeys([...categoryKeys, category.key]);
                      } else {
                        const finalCategoryKeys = categoryKeys.filter(
                          (key) => key !== category.key
                        );

                        setCategoryKeys(finalCategoryKeys);
                      }
                    }}
                  >
                    {category.title}
                  </Checkbox>
                ))}
              </Wrap>
              <FormErrorMessage>{categoriesErrorMessage}</FormErrorMessage>
            </FormControl>
          </Box>
          <Button
            m={5}
            colorScheme='teal'
            type='submit'
            onClick={formik.handleSubmit}
            isDisabled={!formik.isValid}
          >
            AskAway!
          </Button>
        </Box>
      </Flex>
    </SlideFade>
  );
};

export default QuestionsFormPage;
