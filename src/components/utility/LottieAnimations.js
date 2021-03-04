import Lottie from 'react-lottie';
import loadingAnimationData from './../../lottie/loading.json';

export const LoadingAnimation = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingAnimationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return <Lottie options={defaultOptions} height={400} width={400} />;
};
