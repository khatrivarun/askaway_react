import { Flex, Box, Heading, Button, useToast } from '@chakra-ui/react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import FormfieldComponent from '../components/Formfield';
import * as AuthActions from '../store/actions/auth';
import { useDispatch } from 'react-redux';

const UserFormPage = () => {
  const dispatch = useDispatch();
  const toast = useToast();

  const onRegister = async (values) => {
    try {
      await dispatch(
        AuthActions.emailAndPasswordRegister(
          values.email,
          values.password,
          values.firstName,
          values.lastName
        )
      );
    } catch (error) {
      console.log(error.message);
      toast({
        title: 'Error occured during registration!',
        status: 'error',
        description: error.message,
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordAgain: '',
    },
    onSubmit: onRegister,
    validationSchema: yup.object().shape({
      firstName: yup.string().required(),
      lastName: yup.string().required(),
      email: yup.string().email().required(),
      password: yup.string().min(5).required(),
      passwordAgain: yup.string().min(5).required(),
    }),
  });

  return (
    <Flex h='100vh' align='center' justify='center' direction='column'>
      <Heading>Register Yourself!</Heading>
      <Box mt={30}>
        <Flex direction='row'>
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
        <FormfieldComponent
          error={formik.errors.passwordAgain}
          label='Password Again'
          type='password'
          placeholder='Your Password Again'
          value={formik.values.passwordAgain}
          handleChange={formik.handleChange('passwordAgain')}
        />
        <Button
          m={5}
          colorScheme='teal'
          type='submit'
          onClick={formik.handleSubmit}
          isDisabled={!formik.isValid}
        >
          Register Away!
        </Button>
      </Box>
    </Flex>
  );
};

export default UserFormPage;
