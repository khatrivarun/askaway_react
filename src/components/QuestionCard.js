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
} from '@chakra-ui/react';
import {
  IoHeart,
  IoList,
  IoEllipsisVertical,
  IoHeartOutline,
} from 'react-icons/io5';
import { useHistory } from 'react-router';
import * as AuthUtils from './../utils/auth';
import * as QuestionUtils from './../utils/questions';

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
}) => {
  const currentUser = AuthUtils.getCurrentUser();
  const { colorMode } = useColorMode();
  const history = useHistory();
  const { isOpen, onOpen, onClose } = useDisclosure();

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
                    editQuestion(question, description, questionId, categories);
                  }}
                >
                  Update Question
                </MenuItem>
                <MenuItem onClick={onOpen}>Delete Question</MenuItem>
              </MenuList>
            </Menu>
          )}
        </Flex>
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
              if (likes.indexOf(currentUser.uid) !== -1) {
                QuestionUtils.unlikeQuestion(likes, questionId);
              } else {
                QuestionUtils.likeQuestion(likes, questionId);
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
            <Box m={5}>
              <Text>Are you sure you want to delete your question?</Text>
              <Flex justify='space-between' my={5}>
                <Button
                  colorScheme='teal'
                  onClick={async () => {
                    await deleteQuestion(questionId);

                    if (displayFull) {
                      history.goBack();
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
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default QuestionCardComponent;
