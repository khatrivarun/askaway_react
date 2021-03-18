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
} from '@chakra-ui/react';
import {
  IoHeart,
  IoList,
  IoEllipsisVertical,
  IoHeartOutline,
} from 'react-icons/io5';
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
}) => {
  const currentUser = AuthUtils.getCurrentUser();

  return (
    <Box
      w={{ base: 300, md: 'md', lg: 'lg', xl: 'xl' }}
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
          <Text fontSize='2xl' fontWeight='bold'>
            {question}
          </Text>
        </Box>
        {user.userId === currentUser.uid && (
          <Menu>
            <MenuButton
              as={IconButton}
              icon={<IoEllipsisVertical />}
              color='black'
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
              <MenuItem onClick={async () => await deleteQuestion(questionId)}>
                Delete Question
              </MenuItem>
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
        <Button
          variant='ghost'
          colorScheme='teal'
          leftIcon={<IoList color='teal' />}
        >
          {answers.length} Answers
        </Button>
      </Flex>
    </Box>
  );
};

export default QuestionCardComponent;
