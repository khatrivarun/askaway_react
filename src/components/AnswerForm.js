import {
  Button,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  useToast,
} from '@chakra-ui/react';
import FormfieldComponent from './Formfield';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Bugsnag from '@bugsnag/js';
import { useState } from 'react';
import { LoadingAnimation } from './utility/LottieAnimations';

const AnswerFormComponent = ({
  answerId = '',
  answer = '',
  addAnswer,
  updateAnswer,
  isEdit = false,
  onModalClose,
}) => {
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const onSubmit = async (values) => {
    try {
      setLoading(true);
      if (!isEdit) {
        await addAnswer(values.answer);
      } else {
        await updateAnswer(answerId, values.answer);
        onModalClose();
      }
      formik.handleReset();
      setLoading(false);
      toast({
        title: 'Success!',
        description: isEdit
          ? 'Answer successfully updated!'
          : 'Successfully answered the question!',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      Bugsnag.notify(error);
      setLoading(false);
      toast({
        title: 'Error!',
        description: 'Some error has occured! Please try again later!',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
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
    <>
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
      <Modal isOpen={loading}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <Flex align='center' justify='center' direction='column' m={30}>
              <LoadingAnimation />
              <Heading textAlign='center'>
                {isEdit ? 'Updating your answer!' : 'Answering the question!'}
              </Heading>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AnswerFormComponent;
