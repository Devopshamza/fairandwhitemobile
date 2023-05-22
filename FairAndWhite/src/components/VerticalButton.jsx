import {Box, Text, Pressable} from 'native-base';
import React from 'react';

import {StyleSheet} from 'react-native';

const CustomT = ({children}) => {
  return (
    <Text
      fontWeight="700"
      fontFamily="body"
      fontSize="sm"
      color="primary.500"
      textAlign="center">
      {children}
    </Text>
  );
};

const VerticalButton = ({str, onPress}) => {
  if (!str) {
    return <></>;
  }
  return (
    <Pressable
      onPress={onPress}
      borderColor="primary.600"
      borderWidth="1"
      maxW="52"
      py="3"
      borderRadius="full">
      <Box mb="3">
        {str
          .split(' ')[0]
          .split('')
          .map((item, index) => (
            <CustomT key={index}>{item}</CustomT>
          ))}
      </Box>
      <Box>
        {str
          .split(' ')[1]
          .split('')
          .map((item, index) => (
            <CustomT key={index}>{item}</CustomT>
          ))}
      </Box>
    </Pressable>
  );
};

export default VerticalButton;
