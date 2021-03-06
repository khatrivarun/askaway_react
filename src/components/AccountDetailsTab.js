import {
  Box,
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  useToast,
  useDisclosure,
  Flex,
} from '@chakra-ui/react';
import ImageUploadComponent from './utility/ImageUpload';
import * as AuthUtils from './../utils/auth';
import { LoadingAnimation } from './utility/LottieAnimations';
import { useFormik } from 'formik';
import * as yup from 'yup';
import FormfieldComponent from './Formfield';

const AccountDetailsTabComponent = ({ user }) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const imageUpload = async (file) => {
    onOpen();
    await AuthUtils.updateProfilePicture(file);
    onClose();
    toast({
      title: 'Success!',
      status: 'success',
      description: 'Profile Picture updated',
      duration: 9000,
      isClosable: true,
    });
  };

  const onChangeDisplayName = async (values) => {
    onOpen();
    await AuthUtils.updateName(values.name);
    onClose();
    toast({
      title: 'Success!',
      status: 'success',
      description: 'Name updated',
      duration: 9000,
      isClosable: true,
    });
  };

  const formik = useFormik({
    initialValues: { name: user.displayName },
    validationSchema: yup.object().shape({
      name: yup.string().min(5).required(),
    }),
    onSubmit: onChangeDisplayName,
  });

  return (
    <>
      <Box mx={50}>
        <Heading color='teal'>Update your profile</Heading>
        <Box mx={50}>
          <ImageUploadComponent
            defaultImage={user.photoUrl}
            onUpload={imageUpload}
          />
        </Box>
        <FormfieldComponent
          error={formik.errors.name}
          label='Name'
          type='text'
          placeholder='Your Name'
          value={formik.values.name}
          handleChange={formik.handleChange('name')}
        />
        <Button
          m={5}
          colorScheme='teal'
          type='submit'
          onClick={formik.handleSubmit}
          isDisabled={!formik.isValid}
        >
          Update Name
        </Button>
      </Box>
      <Modal isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <Flex align='center' justify='center' direction='column' m={30}>
              <LoadingAnimation />
              <Heading textAlign='center'>
                Updating your profile details
              </Heading>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AccountDetailsTabComponent;
