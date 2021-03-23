import { Avatar, Flex, Link, Text } from '@chakra-ui/react';

const UserListComponent = ({ users }) => {
  return (
    <Flex direction='column' align='center' justify='center' w='100%'>
      {users.map((user) => (
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
      ))}
    </Flex>
  );
};

export default UserListComponent;
