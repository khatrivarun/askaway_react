import {
  Drawer,
  DrawerOverlay,
  DrawerHeader,
  DrawerContent,
  DrawerBody,
  Divider,
} from '@chakra-ui/react';

const DrawerComponent = ({ onClose, isOpen }) => {
  return (
    <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerHeader bgColor='teal' textColor='white'>
            AskAway
          </DrawerHeader>
          <DrawerBody bgColor='teal' textColor='white'>
            <p>Page 1</p>
            <p>Page 2</p>
            <p>Page 3</p>
            <Divider />
            <p>Page 1</p>
            <p>Page 2</p>
            <p>Page 3</p>
            <Divider />
            <p>Page 1</p>
            <p>Page 2</p>
            <p>Page 3</p>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

export default DrawerComponent;
