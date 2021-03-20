import { Button, Flex } from '@chakra-ui/react';
import FormfieldComponent from './Formfield';
import { useFormik } from 'formik';
import * as yup from 'yup';

const AnswerFormComponent = ({
  answerId = '',
  answer = '',
  addAnswer,
  updateAnswer,
  isEdit = false,
  onModalClose,
}) => {
  const onSubmit = async (values) => {
    if (!isEdit) {
      await addAnswer(values.answer);
    } else {
      await updateAnswer(answerId, values.answer);
      onModalClose();
    }
    formik.handleReset();
  };

  const formik = useFormik({
    initialValues: {
      answer: answer,
    },
    validationSchema: yup.object().shape({
      answer: yup.string().required().min(20),
    }),
    onSubmit: onSubmit,
  });

  return (
    <Flex direction='column' justify='center' w='100%'>
      <FormfieldComponent
        label='Answer'
        placeholder='Your Answer'
        isTextField={true}
        error={formik.errors.answer}
        type='text'
        value={formik.values.answer}
        handleChange={formik.handleChange('answer')}
      />
      <Button
        m={5}
        colorScheme='teal'
        type='submit'
        onClick={formik.handleSubmit}
        isDisabled={!formik.isValid}
      >
        AnswerAway!
      </Button>
    </Flex>
  );
};

export default AnswerFormComponent;
