import { Avatar, Flex, Link, Text } from '@chakra-ui/react';
import { NoDataAnimation } from './utility/LottieAnimations';

const UserListComponent = ({ users }) => {
  return (
    <Flex direction='column' align='center' justify='center' w='100%'>
      {users.length > 0 ? (
        users.map((user) => (
          <Link href={`/account/${user.userId}`} key={user.userId}>
            <Flex
              w={{ base: 300, md: 'md', lg: 'lg' }}
              direction='row'
              justify='space-around'
              borderWidth='1px'
              borderRadius='lg'
              overflow='hidden'
              p={3}
              m={2}
            >
              <Avatar size='lg' name={user.displayName} src={user.photoUrl} />
              <Flex direction='column' justify='center' align='flex-start'>
                <Text>{user.displayName}</Text>
              </Flex>
            </Flex>
          </Link>
        ))
      ) : (
        <Flex
          w={{ base: 300, md: 'md', lg: 'lg' }}
          direction='column'
          justify='center'
          align='center'
          borderWidth='1px'
          borderRadius='lg'
          overflow='hidden'
          p={3}
          m={2}
        >
          <NoDataAnimation />
          <Text>No Data Found!</Text>
        </Flex>
      )}
    </Flex>
  );
};

export default UserListComponent;
