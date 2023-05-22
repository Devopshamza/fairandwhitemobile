import React from 'react';
import LottieView from 'lottie-react-native';
import {Center, Spinner} from 'native-base';

const AnimatedLoader = () => {
  return (
    <Center flex="1">
      <Spinner size="lg" />
    </Center>
  );
};

export default AnimatedLoader;
