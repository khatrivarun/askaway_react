import Bugsnag from '@bugsnag/js';
import {
  Box,
  Text,
  Flex,
  Button,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorMode,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Wrap,
  Tag,
  Center,
  Heading,
  useToast,
} from '@chakra-ui/react';
import {
  IoHeart,
  IoList,
  IoEllipsisVertical,
  IoHeartOutline,
} from 'react-icons/io5';
import { useHistory } from 'react-router';
import { useState } from 'react';
import * as AuthUtils from './../utils/auth';
import * as QuestionUtils from './../utils/questions';
import { LoadingAnimation } from './utility/LottieAnimations';

const QuestionCardComponent = ({
  questionId,
  question,
  description,
  likes,
  answers,
  user,
  categories,
  editQuestion,
  deleteQuestion,
  displayFull = false,
  userProfileMode = false,
  selectedAnswerId,
}) => {
  const currentUser = AuthUtils.getCurrentUser();
  const { colorMode } = useColorMode();
  const history = useHistory();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  return (
    <>
      <Box
        w={{ base: 300, md: 'md', lg: 'lg', xl: '2xl' }}
        borderWidth='1px'
        borderRadius='lg'
        overflow='hidden'
        p={30}
        my={5}
      >
        <Flex justify='space-between' align='flex-start'>
          <Box>
            <Text color='gray'>
              {user.displayName} asks the following question
            </Text>
            <Text
              fontSize='2xl'
              fontWeight='bold'
              cursor='pointer'
              onClick={() => {
                history.push(`/questions/${questionId}`);
              }}
            >
              {question}
            </Text>
            {displayFull && (
              <Text fontSize='2xl'>Description: {description}</Text>
            )}
          </Box>
          {user.userId === currentUser.uid && (
            <Menu>
              <MenuButton
                as={IconButton}
                icon={<IoEllipsisVertical />}
                color={colorMode === 'light' ? 'black' : 'white'}
                colorScheme='white'
              />
              <MenuList>
                <MenuItem
                  onClick={() => {
                    if (!userProfileMode)
                      editQuestion(
                        question,
                        description,
                        questionId,
                        categories
                      );
                    else editQuestion(questionId);
                  }}
                >
                  Update Question
                </MenuItem>
                <MenuItem onClick={onOpen}>Delete Question</MenuItem>
              </MenuList>
            </Menu>
          )}
        </Flex>
        <Wrap>
          {categories.map((category) => (
            <Tag key={category.key} m={1}>
              {category.title}
            </Tag>
          ))}
          <Tag m={1} colorScheme='teal'>
            {selectedAnswerId !== '' ? 'Answered' : 'Unanswered'}
          </Tag>
        </Wrap>
        <Flex direction='row' justify='space-between'>
          <Button
            variant='ghost'
            colorScheme='teal'
            leftIcon={
              likes.indexOf(currentUser.uid) !== -1 ? (
                <IoHeart color='teal' />
              ) : (
                <IoHeartOutline color='teal' />
              )
            }
            onClick={async () => {
              try {
                if (likes.indexOf(currentUser.uid) !== -1) {
                  await QuestionUtils.unlikeQuestion(likes, questionId);
                } else {
                  await QuestionUtils.likeQuestion(likes, questionId);
                }
              } catch (error) {
                Bugsnag.notify(error);
              }
            }}
          >
            {likes.length} Noices
          </Button>
          {!displayFull && (
            <Button
              variant='ghost'
              colorScheme='teal'
              leftIcon={<IoList color='teal' />}
            >
              {answers.length} Answers
            </Button>
          )}
        </Flex>
      </Box>
      <Modal isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            {!loading ? (
              <Box m={5}>
                <Text>Are you sure you want to delete your question?</Text>
                <Flex justify='space-between' my={5}>
                  <Button
                    colorScheme='teal'
                    onClick={async () => {
                      try {
                        setLoading(true);
                        await deleteQuestion(questionId);

                        if (displayFull) {
                          history.goBack();
                        }

                        setLoading(false);
                        toast({
                          title: 'Success!',
                          description: 'Question Deleted.',
                          status: 'success',
                          duration: 9000,
                          isClosable: true,
                        });
                      } catch (error) {
                        setLoading(false);
                        Bugsnag.notify(error);
                        toast({
                          title: 'Error!',
                          description: error,
                          status: 'error',
                          duration: 9000,
                          isClosable: true,
                        });
                      }
                    }}
                  >
                    Yes
                  </Button>
                  <Button colorScheme='teal' onClick={onClose}>
                    No
                  </Button>
                </Flex>
              </Box>
            ) : (
              <Center>
                <LoadingAnimation />
                <Heading>Deleting question!</Heading>
              </Center>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default QuestionCardComponent;
