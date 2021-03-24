import {
  Box,
  Button,
  Heading,
  useToast,
  useDisclosure,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Flex,
} from '@chakra-ui/react';
import * as AuthUtils from './../utils/auth';
import { useFormik } from 'formik';
import * as yup from 'yup';
import FormfieldComponent from './Formfield';
import { LoadingAnimation } from './utility/LottieAnimations';
import Bugsnag from '@bugsnag/js';

const ChangePasswordTabComponent = () => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onChangePassword = async (values) => {
    try {
      onOpen();
      await AuthUtils.changePassword(values.oldPassword, values.newPassword);
      onClose();
      toast({
        title: 'Success!',
        status: 'success',
        description: 'Password successfully updated',
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
    initialValues: {
      oldPassword: '',
      newPassword: '',
      newPasswordAgain: '',
    },
    validationSchema: yup.object().shape({
      oldPassword: yup.string().min(5).required(),
      newPassword: yup.string().min(5).required(),
      newPasswordAgain: yup.string().min(5).required(),
    }),
    onSubmit: onChangePassword,
  });
  return (
    <>
      <Box mx={25}>
        <Heading color='teal'>Change your password</Heading>
        <Box mx={25}>
          <FormfieldComponent
            type='password'
            error={formik.errors.oldPassword}
            label='Old Password'
            placeholder='Your Old Password'
            value={formik.values.oldPassword}
            handleChange={formik.handleChange('oldPassword')}
          />
          <FormfieldComponent
            type='password'
            error={formik.errors.newPassword}
            label='New Password'
            placeholder='Your New Password'
            value={formik.values.newPassword}
            handleChange={formik.handleChange('newPassword')}
          />
          <FormfieldComponent
            type='password'
            error={formik.errors.newPasswordAgain}
            label='New Password Again'
            placeholder='Your New Password Again'
            value={formik.values.newPasswordAgain}
            handleChange={formik.handleChange('newPasswordAgain')}
          />
          <Button
            m={5}
            colorScheme='teal'
            type='submit'
            onClick={formik.handleSubmit}
            isDisabled={!formik.isValid}
          >
            Update Password
          </Button>
        </Box>
      </Box>
      <Modal isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <Flex align='center' justify='center' direction='column' m={30}>
              <LoadingAnimation />
              <Heading textAlign='center'>Updating your password!</Heading>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ChangePasswordTabComponent;
