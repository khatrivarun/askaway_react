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
import { useState } from 'react';
import { IoHeart, IoEllipsisVertical, IoHeartOutline } from 'react-icons/io5';
import * as AuthUtils from './../utils/auth';
import AnswerFormComponent from './AnswerForm';
import Bugsnag from '@bugsnag/js';

const AnswerCardComponent = ({
  id,
  user,
  answer,
  likes,
  markedAnswer = false,
  updateAnswer,
  deleteAnswer,
  isOwnQuestion,
  likeAnswer,
  unlikeAnswer,
  markAnswer,
  unmarkAnswer,
}) => {
  const [modalMode, setModalMode] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const currentUser = AuthUtils.getCurrentUser();
  const { colorMode } = useColorMode();

  const editAnswerModal = () => {
    setModalMode('edit');
    onOpen();
  };
  const deleteAnswerModal = () => {
    setModalMode('delete');
    onOpen();
  };

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
            <Text color='gray'>{user.displayName} answers</Text>
            <Text fontSize='xl'>{answer}</Text>
          </Box>
          {user.userId === currentUser.uid && !isOwnQuestion && (
            <Menu>
              <MenuButton
                as={IconButton}
                icon={<IoEllipsisVertical />}
                color={colorMode === 'light' ? 'black' : 'white'}
                colorScheme='white'
              />
              <MenuList>
                <MenuItem onClick={editAnswerModal}>Update Answer</MenuItem>
                <MenuItem onClick={deleteAnswerModal}>Delete Answer</MenuItem>
              </MenuList>
            </Menu>
          )}
          {isOwnQuestion && !(user.userId === currentUser.uid) && (
            <Menu>
              <MenuButton
                as={IconButton}
                icon={<IoEllipsisVertical />}
                color={colorMode === 'light' ? 'black' : 'white'}
                colorScheme='white'
              />
              <MenuList>
                <MenuItem
                  onClick={async () => {
                    try {
                      !markedAnswer
                        ? await markAnswer(id, user.userId)
                        : await unmarkAnswer();
                    } catch (error) {
                      Bugsnag.notify(error);
                    }
                  }}
                >
                  {!markedAnswer ? 'Mark As Answer' : 'Unmark this answer'}
                </MenuItem>
              </MenuList>
            </Menu>
          )}
          {isOwnQuestion && user.userId === currentUser.uid && (
            <Menu>
              <MenuButton
                as={IconButton}
                icon={<IoEllipsisVertical />}
                color={colorMode === 'light' ? 'black' : 'white'}
                colorScheme='white'
              />
              <MenuList>
                <MenuItem
                  onClick={async () => {
                    try {
                      !markedAnswer
                        ? await markAnswer(id, user.userId)
                        : await unmarkAnswer();
                    } catch (error) {
                      Bugsnag.notify(error);
                    }
                  }}
                >
                  {!markedAnswer ? 'Mark As Answer' : 'Unmark this answer'}
                </MenuItem>
                <MenuItem onClick={editAnswerModal}>Update Answer</MenuItem>
                <MenuItem onClick={deleteAnswerModal}>Delete Answer</MenuItem>
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
              try {
                if (likes.indexOf(currentUser.uid) !== -1) {
                  await unlikeAnswer(id);
                } else {
                  await likeAnswer(id);
                }
              } catch (error) {
                Bugsnag.notify(error);
              }
            }}
          >
            {likes.length} Noices
          </Button>
        </Flex>
      </Box>
      <Modal isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            {modalMode === 'edit' ? (
              <AnswerFormComponent
                isEdit={true}
                answerId={id}
                answer={answer}
                updateAnswer={updateAnswer}
                onModalClose={onClose}
              />
            ) : (
              <Box m={5}>
                <Text>Are you sure you want to delete your answer?</Text>
                <Flex justify='space-between' my={5}>
                  <Button
                    colorScheme='teal'
                    onClick={async () => {
                      try {
                        await deleteAnswer(id);
                      } catch (error) {
                        Bugsnag.notify(error);
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
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AnswerCardComponent;
