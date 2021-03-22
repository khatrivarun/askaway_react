import { Avatar, Flex, Text } from '@chakra-ui/react';
import { useHistory } from 'react-router';

const UserTileComponent = ({
  uid,
  photoUrl,
  displayName,
  closeModal,
  isInModal = true,
}) => {
  const history = useHistory();
  return (
    <Flex
      direction='row'
      align='center'
      justify='space-evenly'
      w='100%'
      borderWidth='1px'
      borderRadius='lg'
      overflow='hidden'
      p={3}
      mt={5}
    >
      <Avatar size='lg' name={displayName} src={photoUrl} />
      <Text
        cursor='pointer'
        onClick={() => {
          if (isInModal) closeModal();
          history.push(`/account/${uid}`);
        }}
      >
        {displayName}
      </Text>
    </Flex>
  );
};

export default UserTileComponent;
