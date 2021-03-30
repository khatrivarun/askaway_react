import Lottie from 'react-lottie';
import loadingAnimationData from './../../lottie/loading.json';
import _500AnimationData from './../../lottie/500.json';
import _404AnimationData from './../../lottie/404.json';
import NoDataAnimationData from './../../lottie/no-data.json';
import CommunityAnimationData from './../../lottie/community.json';
import QuestionAnimationData from './../../lottie/question.json';
import ReactFirebaseAnimationData from './../../lottie/react-firebase.json';
import RealtimeAnimationData from './../../lottie/realtime.json';
import { Box } from '@chakra-ui/react';

export const LoadingAnimation = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingAnimationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <Box m={30}>
      <Lottie options={defaultOptions} height={200} width={200} />
    </Box>
  );
};

export const Server500Animation = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: _500AnimationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <Box m={30}>
      <Lottie options={defaultOptions} height={200} width={200} />
    </Box>
  );
};

export const NotFound404Animation = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: _404AnimationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <Box m={30}>
      <Lottie options={defaultOptions} height={200} width={200} />
    </Box>
  );
};

export const NoDataAnimation = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: NoDataAnimationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <Box m={30}>
      <Lottie options={defaultOptions} height={200} width={200} />
    </Box>
  );
};

export const CommunityAnimation = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: CommunityAnimationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <Box m={30}>
      <Lottie options={defaultOptions} height={300} width={300} />
    </Box>
  );
};

export const QuestionAnimation = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: QuestionAnimationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <Box m={30}>
      <Lottie options={defaultOptions} height={300} width={300} />
    </Box>
  );
};

export const ReactFirebaseAnimation = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: ReactFirebaseAnimationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <Box m={30}>
      <Lottie options={defaultOptions} height={300} width={300} />
    </Box>
  );
};

export const RealtimeAnimation = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: RealtimeAnimationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <Box m={30}>
      <Lottie options={defaultOptions} height={300} width={300} />
    </Box>
  );
};
