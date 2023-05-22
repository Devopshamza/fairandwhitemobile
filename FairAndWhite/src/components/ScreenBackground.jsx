import {Box} from 'native-base';
import React from 'react';
import {ImageBackground} from 'react-native';

const ScreenBackground = ({children}) => {
  return (
    <Box flex={1} width="full">
      <ImageBackground
        source={require('../assets/images/background.png')}
        resizeMode="cover"
        style={{flex: 1}}>
        {children}
      </ImageBackground>
    </Box>
  );
};

export default ScreenBackground;
