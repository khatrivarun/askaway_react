import { Button, Flex, Heading, Link, useToast } from '@chakra-ui/react';
import { useFormik } from 'formik';
import FormfieldComponent from '../components/Formfield';
import * as yup from 'yup';
import Bugsnag from '@bugsnag/js';
import * as AuthUtils from '../utils/auth';

const ForgotPasswordPage = () => {
  const toast = useToast();
  const onSubmit = async (values) => {
    try {
      await AuthUtils.passwordReset(values.email);
      toast({
        title: 'Success!',
        status: 'success',
        description:
          'If you have an account with us, you will recieve the mail for resetting your password',
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
      Bugsnag.notify(error);
      toast({
        title: 'Error occured!',
        status: 'error',
        description: 'Something has gone wrong. Please try again later',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: yup.object().shape({
      email: yup.string().required().email(),
    }),
    onSubmit: onSubmit,
  });
  return (
    <Flex h='100vh' align='center' justify='center' direction='column'>
      <Heading>Forgot your password?</Heading>
      <FormfieldComponent
        label='Email Address'
        type='email'
        placeholder='Your email address'
        error={formik.errors.email}
        value={formik.values.email}
        handleChange={formik.handleChange('email')}
      />
      <Button
        colorScheme='teal'
        type='submit'
        onClick={formik.handleSubmit}
        isDisabled={!formik.isValid}
      >
        Submit
      </Button>
      <Link m={5} href='/login'>
        Have an account? Login here!
      </Link>
    </Flex>
  );
};

export default ForgotPasswordPage;
