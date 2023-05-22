import React from 'react';

import {Text, Pressable, Box} from 'native-base';
import {GestureResponderEvent, StyleSheet} from 'react-native';
import {GradientBorderView} from '@good-react-native/gradient-border';

const Buttons = ({color, text, onPress, gradientStart, gradientEnd}) => {
  return (
    <Pressable onPress={onPress} width="full" marginBottom="4">
      <GradientBorderView
        gradientProps={{
          colors: [gradientStart, gradientEnd],
        }}
        style={styles.linearGradient}>
        <Box style={styles.container}>
          <Text
            textAlign="center"
            fontFamily="heading"
            fontSize="sm"
            fontWeight="semibold"
            letterSpacing="2xl"
            color={color}>
            {text}
          </Text>
        </Box>
      </GradientBorderView>
    </Pressable>
  );
};
var styles = StyleSheet.create({
  linearGradient: {
    borderRadius: 30,
    width: '100%',
    borderWidth: 2,
  },
  container: {
    paddingVertical: 10,
    paddingLeft: 30,
    paddingRight: 30,
  },
});

export default Buttons;
