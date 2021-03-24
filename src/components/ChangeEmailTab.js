import {
  Box,
  Heading,
  Button,
  useToast,
  useDisclosure,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import FormfieldComponent from './Formfield';
import * as AuthUtils from './../utils/auth';
import { LoadingAnimation } from './utility/LottieAnimations';
import Bugsnag from '@bugsnag/js';

const ChangeEmailTabComponent = ({ user }) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onChangeEmail = async (values) => {
    try {
      onOpen();
      await AuthUtils.changeEmail(values.password, values.email);
      onClose();
      toast({
        title: 'Success!',
        status: 'success',
        description: 'Email successfully updated',
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      Bugsnag.notify(error);
      onClose();
      toast({
        title: 'Error occured!',
        status: 'error',
        description: error.message,
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const formik = useFormik({
    initialValues: { email: user.emailAddress, password: '' },
    validationSchema: yup.object().shape({
      email: yup.string().email().required(),
      password: yup.string().min(5).required(),
    }),
    onSubmit: onChangeEmail,
  });

  return (
    <>
      <Box mx={25}>
        <Heading color='teal'>Change your email address</Heading>
        <Box mx={25}>
          <FormfieldComponent
            type='email'
            error={formik.errors.email}
            label='Email Address'
            placeholder='Your New Email Address'
            value={formik.values.email}
            handleChange={formik.handleChange('email')}
          />
          <FormfieldComponent
            error={formik.errors.password}
            label='Password'
            type='password'
            placeholder='Your Password'
            value={formik.values.password}
            handleChange={formik.handleChange('password')}
          />
          <Button
            m={5}
            colorScheme='teal'
            type='submit'
            onClick={formik.handleSubmit}
            isDisabled={!formik.isValid}
          >
            Update Email Address
          </Button>
        </Box>
      </Box>
      <Modal isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <Flex align='center' justify='center' direction='column' m={30}>
              <LoadingAnimation />
              <Heading textAlign='center'>Updating your email address!</Heading>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ChangeEmailTabComponent;
