import Bugsnag from '@bugsnag/js';
import {
  Box,
  Button,
  Center,
  CloseButton,
  Flex,
  Heading,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Spinner,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import * as AuthUtils from './../utils/auth';
import UserTileComponent from './UserTile';

const UserCardComponent = ({ uid }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalMode, setModalMode] = useState('');
  const [modalData, setModalData] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const currentUser = AuthUtils.getCurrentUser();

  useEffect(() => {
    return AuthUtils.fetchUserInRealTime(uid).onSnapshot(
      async (user) => {
        const userFromFirebase = AuthUtils.convertToUserObject(user);
        userFromFirebase.followers = await AuthUtils.fetchUsersFromFirebase(
          userFromFirebase.followers
        );

        userFromFirebase.following = await AuthUtils.fetchUsersFromFirebase(
          userFromFirebase.following
        );

        setUser(userFromFirebase);
        setLoading(false);
      },
      (error) => {
        Bugsnag.notify(error);
      }
    );
  }, [uid]);

  return (
    <>
      <Box
        w={{ base: 300, md: 'md', lg: 'lg', xl: '2xl' }}
        borderWidth='1px'
        borderRadius='lg'
        overflow='hidden'
        my={10}
        p={30}
      >
        {!loading ? (
          <Flex justify='center' align='center' direction='column'>
            <Image borderRadius='full' boxSize='200px' src={user.photoUrl} />
            <Heading>{user.displayName}</Heading>
            <Flex
              justify='space-evenly'
              align='center'
              direction={{ base: 'column', lg: 'row' }}
              w='100%'
            >
              <Text fontSize='xl' fontWeight='bold' color='teal'>
                Questions Answered: {user.questionsAnswered}
              </Text>
              <Text fontSize='xl' fontWeight='bold' color='teal'>
                Questions Asked: {user.questionsAsked}
              </Text>
              <Text fontSize='xl' fontWeight='bold' color='teal'>
                Answers Chosen: {user.answersPicked}
              </Text>
            </Flex>
            <Flex
              justify='space-evenly'
              align='center'
              direction={{ base: 'column', lg: 'row' }}
              w='100%'
            >
              <Text
                fontSize='xl'
                fontWeight='bold'
                color='teal'
                cursor='pointer'
                onClick={() => {
                  setModalData(user.followers);
                  setModalMode('followers');
                  onOpen();
                }}
              >
                {user.followers.length} Followers
              </Text>
              <Text
                fontSize='xl'
                fontWeight='bold'
                color='teal'
                cursor='pointer'
                onClick={() => {
                  setModalData(user.following);
                  setModalMode('following');
                  onOpen();
                }}
              >
                {user.following.length} Following
              </Text>
            </Flex>
            {uid !== currentUser.uid && (
              <Flex mt={5}>
                <Button
                  onClick={async () => {
                    try {
                      if (
                        user.followers
                          .map((user) => user.userId)
                          .indexOf(currentUser.uid) === -1
                      ) {
                        await AuthUtils.followUser(user.userId);
                      } else {
                        await AuthUtils.unfollowUser(user.userId);
                      }
                    } catch (error) {
                      Bugsnag.notify(error);
                    }
                  }}
                  colorScheme='teal'
                >
                  {user.followers
                    .map((user) => user.userId)
                    .indexOf(currentUser.uid) === -1
                    ? 'Follow'
                    : 'Following'}
                </Button>
              </Flex>
            )}
          </Flex>
        ) : (
          <Center>
            <Spinner size='xl' />
          </Center>
        )}
      </Box>
      <Center>
        <Modal isOpen={isOpen}>
          <ModalOverlay />
          <ModalContent>
            <ModalBody>
              <CloseButton onClick={onClose} />
              <Flex m={5} align='center' justify='center' direction='column'>
                <Text>
                  {modalMode === 'following' ? 'Following' : 'Followers'}
                </Text>
                {modalData.map((user) => (
                  <UserTileComponent
                    key={user.userId}
                    uid={user.userId}
                    photoUrl={user.photoUrl}
                    displayName={user.displayName}
                    closeModal={onClose}
                  />
                ))}
              </Flex>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Center>
    </>
  );
};

export default UserCardComponent;
