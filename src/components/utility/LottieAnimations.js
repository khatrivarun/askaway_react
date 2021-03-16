import Lottie from 'react-lottie';
import loadingAnimationData from './../../lottie/loading.json';
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
