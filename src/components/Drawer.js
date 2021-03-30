import Bugsnag from '@bugsnag/js';
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  Avatar,
  Spinner,
  Text,
  Flex,
  useColorMode,
} from '@chakra-ui/react';
import {
  IoAdd,
  IoHome,
  IoLogOut,
  IoMoon,
  IoPencil,
  IoPerson,
  IoSunny,
} from 'react-icons/io5';
import { useHistory } from 'react-router';
import useFirebaseUser from '../hooks/useFirebaseUser';
import * as AuthUtils from './../utils/auth';
import DrawerTileComponent from './DrawerTile';

const DrawerComponent = ({ onClose, isOpen }) => {
  const { loading, user, error } = useFirebaseUser();
  const { colorMode, toggleColorMode } = useColorMode();
  const history = useHistory();
  return (
    <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay>
        {!loading ? (
          <DrawerContent>
            <Flex mt={10} align='center' justify='center' direction='column'>
              <Avatar size='2xl' name={user.displayName} src={user.photoUrl} />
              <Text mt={5}>{user.displayName}</Text>
            </Flex>
            <Flex justify='center' direction='column'>
              <DrawerTileComponent
                onClick={() => history.push('/questions')}
                icon={<IoHome />}
                text='Go Home'
              />
              <DrawerTileComponent
                onClick={toggleColorMode}
                icon={colorMode === 'light' ? <IoMoon /> : <IoSunny />}
                text={`Change to ${
                  colorMode === 'light' ? 'dark' : 'light'
                } mode`}
              />
              <DrawerTileComponent
                onClick={() => history.push('/questions/new')}
                icon={<IoAdd />}
                text='Add A Question'
              />
              <DrawerTileComponent
                onClick={() => history.push('/account/edit')}
                icon={<IoPencil />}
                text='Update User Details'
              />
              <DrawerTileComponent
                onClick={() => history.push('/account/me')}
                icon={<IoPerson />}
                text='View Your Profile'
              />
              <DrawerTileComponent
                icon={<IoLogOut />}
                text='Log Out'
                onClick={async () => {
                  try {
                    await AuthUtils.logout();
                  } catch (error) {
                    Bugsnag.notify(error);
                  }
                }}
              />
            </Flex>
          </DrawerContent>
        ) : (
          <Spinner />
        )}
      </DrawerOverlay>
    </Drawer>
  );
};

export default DrawerComponent;
