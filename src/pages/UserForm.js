import {
  Flex,
  Box,
  Heading,
  Button,
  useToast,
  useDisclosure,
  Modal,
  ModalBody,
  ModalOverlay,
  ModalContent,
} from '@chakra-ui/react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import FormfieldComponent from '../components/Formfield';
import * as AuthActions from '../store/actions/auth';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { LoadingAnimation } from '../components/utility/LottieAnimations';

const UserFormPage = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const location = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onGoogleAuthPressed = async () => {
    try {
      onOpen();
      await dispatch(AuthActions.googleSignUp());
      onClose();
    } catch (error) {
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

  const onSubmit = async (values) => {
    try {
      onOpen();
      if (location.pathname.startsWith('/register')) {
        await dispatch(
          AuthActions.emailAndPasswordRegister(
            values.email,
            values.password,
            values.firstName,
            values.lastName
          )
        );
      } else {
        await dispatch(
          AuthActions.emailAndPasswordLogin(values.email, values.password)
        );
      }
      onClose();
    } catch (error) {
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
    initialValues: location.pathname.startsWith('/register')
      ? {
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          passwordAgain: '',
        }
      : { email: '', password: '' },
    onSubmit: onSubmit,
    validationSchema: location.pathname.startsWith('/register')
      ? yup.object().shape({
          firstName: yup.string().required(),
          lastName: yup.string().required(),
          email: yup.string().email().required(),
          password: yup.string().min(5).required(),
          passwordAgain: yup.string().min(5).required(),
        })
      : yup.object().shape({
          email: yup.string().email().required(),
          password: yup.string().min(5).required(),
        }),
  });

  return (
    <Flex h='100vh' align='center' justify='center' direction='column' m={30}>
      <Heading>
        {location.pathname.startsWith('/register')
          ? 'Register Yourself!'
          : 'Log in to your account!'}
      </Heading>
      <Box mt={30} w={{ base: '40vh', sm: '50vh', md: '70vh', lg: '80vh' }}>
        {location.pathname.startsWith('/register') && (
          <Flex
            direction={{ base: 'column', lg: 'row' }}
            justify='space-between'
          >
            <FormfieldComponent
              error={formik.errors.firstName}
              label='First Name'
              type='text'
              placeholder='Your First Name'
              value={formik.values.firstName}
              handleChange={formik.handleChange('firstName')}
            />
            <FormfieldComponent
              error={formik.errors.lastName}
              label='Last Name'
              type='text'
              placeholder='Your Last Name'
              value={formik.values.lastName}
              handleChange={formik.handleChange('lastName')}
            />
          </Flex>
        )}
        <FormfieldComponent
          error={formik.errors.email}
          label='Email Address'
          type='email'
          placeholder='Your Email Address'
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
        {location.pathname.startsWith('/register') && (
          <FormfieldComponent
            error={formik.errors.passwordAgain}
            label='Password Again'
            type='password'
            placeholder='Your Password Again'
            value={formik.values.passwordAgain}
            handleChange={formik.handleChange('passwordAgain')}
          />
        )}
        <Button
          m={5}
          colorScheme='teal'
          type='submit'
          onClick={formik.handleSubmit}
          isDisabled={!formik.isValid}
        >
          {location.pathname.startsWith('/register') ? 'Register' : 'Log in'}{' '}
          Away!
        </Button>
        <Button
          m={5}
          colorScheme='whiteAlpha'
          textColor='black'
          onClick={async () => await onGoogleAuthPressed()}
          variant='outline'
        >
          {location.pathname.startsWith('/register')
            ? 'Register with Google'
            : 'Log in with Google'}
        </Button>
      </Box>
      <Modal isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <Flex align='center' justify='center' direction='column'>
              <LoadingAnimation />
              <Heading>
                {location.pathname.startsWith('/register')
                  ? 'Registering you in!'
                  : 'Logging you in!'}
              </Heading>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default UserFormPage;
