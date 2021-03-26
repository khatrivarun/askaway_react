import { Flex, Heading } from '@chakra-ui/layout';
import { useEffect, useState } from 'react';
import UserListComponent from './UserList';
import * as AuthUtils from './../utils/auth';

const TopContributorsListComponent = () => {
  const [users, setUsers] = useState([]);
  useEffect(
    () =>
      AuthUtils.fetchTopContributors().onSnapshot((snapshot) =>
        setUsers(
          snapshot.docs.map((data) => AuthUtils.convertToUserObject(data))
        )
      ),
    []
  );

  return (
    <Flex
      direction='column'
      borderWidth='1px'
      borderRadius='lg'
      overflow='hidden'
      p={5}
      my={5}
    >
      <Heading>Top contributors</Heading>
      <UserListComponent users={users} />
    </Flex>
  );
};

export default TopContributorsListComponent;
