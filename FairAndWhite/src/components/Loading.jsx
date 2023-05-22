import React from 'react';
import {Box, Spinner, Center} from 'native-base';
import {ImageBackground} from 'react-native';

const Loading = ({back = true}) => {
  if (back) {
    return (
      <Box flex="1" width="full">
        <ImageBackground
          source={require('../assets/images/background.png')}
          resizeMode="cover"
          style={{flex: 1}}>
          <Center flex="1">
            <Spinner accessibilityLabel="Loading posts" size="lg" />
          </Center>
        </ImageBackground>
      </Box>
    );
  }
  return (
    <Box flex="1" width="full">
      <Center flex="1">
        <Spinner accessibilityLabel="Loading posts" size="lg" />
      </Center>
    </Box>
  );
};

export default Loading;
