import React from 'react';

import {Pressable, HStack, useTheme, Text} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';

const BackButton = ({onPress, color = 'white'}) => {
  const {colors} = useTheme();
  return (
    <Pressable onPress={() => onPress()}>
      <HStack alignItems="center" space={2}>
        <Icon name="arrow-back-ios" size={10} color={color} />
        <Text color={color} fontSize="md">
          Back
        </Text>
      </HStack>
    </Pressable>
  );
};

export default BackButton;
