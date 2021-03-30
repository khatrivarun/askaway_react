import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import { useHistory } from 'react-router';
import {
  CommunityAnimation,
  QuestionAnimation,
  ReactFirebaseAnimation,
  RealtimeAnimation,
} from '../components/utility/LottieAnimations';

const LandingPage = () => {
  const history = useHistory();
  return (
    <Box>
      <Flex
        direction={{ base: 'column', md: 'row' }}
        justify={{ base: 'center', md: 'space-between' }}
        align='center'
        p={50}
      >
        <Box maxW={{ lg: 600 }}>
          <Heading fontSize={{ base: '4xl', lg: '6xl' }}>
            Ever had a question related to MPSTME? We got the answer to your
            question.
          </Heading>
        </Box>
        <QuestionAnimation />
      </Flex>

      <Flex
        justify='center'
        align='center'
        p={100}
        bgColor='teal'
        direction='column'
      >
        <Heading
          textAlign='center'
          fontSize={{ base: '2xl', lg: '6xl' }}
          color='white'
        >
          Presenting you AskAway, the portal for all your questions to be
          answered by people who have been in your shoes.
        </Heading>

        <Flex
          direction={{ base: 'column', md: 'row' }}
          justify='space-evenly'
          align='center'
          mt={50}
          w='100%'
        >
          <Button
            variant='unstyled'
            color='teal.100'
            onClick={() => history.push('/login')}
          >
            Log in to AskAway
          </Button>
          <Button
            variant='unstyled'
            color='teal.100'
            onClick={() => history.push('/register')}
          >
            Register with AskAway
          </Button>
        </Flex>
      </Flex>

      <Flex
        direction={{ base: 'column', md: 'row' }}
        justify={{ base: 'center', md: 'space-between' }}
        align='center'
        p={50}
      >
        <Box maxW={{ lg: 600 }}>
          <Heading fontSize={{ base: '2xl', lg: '6xl' }}>
            Helpful community
          </Heading>
          <Text fontSize={{ lg: '3xl' }}>
            We have a helpful community of people who are here to help you with
            your problems and doubts. Never hesitate to ask questions!
          </Text>
        </Box>
        <CommunityAnimation />
      </Flex>

      <Flex
        direction={{ base: 'column', md: 'row-reverse' }}
        justify={{ base: 'center', md: 'space-between' }}
        align='center'
        p={50}
      >
        <Box maxW={{ lg: 600 }}>
          <Heading fontSize={{ base: '2xl', lg: '6xl' }}>
            Blazing fast application
          </Heading>
          <Text fontSize={{ lg: '3xl' }}>
            With the power of React and Firebase, we couldn't ask for more
            speed!
          </Text>
        </Box>
        <ReactFirebaseAnimation />
      </Flex>

      <Flex
        direction={{ base: 'column', md: 'row' }}
        justify={{ base: 'center', md: 'space-between' }}
        align='center'
        p={50}
      >
        <Box maxW={{ lg: 600 }}>
          <Heading fontSize={{ base: '2xl', lg: '6xl' }}>
            Real time updates
          </Heading>
          <Text fontSize={{ lg: '3xl' }}>
            Every single part of this application updates in real time! We don't
            want you to miss your precious time with continuous page refreshing!
          </Text>
        </Box>
        <RealtimeAnimation />
      </Flex>
    </Box>
  );
};

export default LandingPage;
