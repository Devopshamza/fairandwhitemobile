import React from 'react';

import {Text, Pressable, Image, Box} from 'native-base';
import {GestureResponderEvent, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const GradientButton = ({
  color,
  onPress,
  gradientStart,
  gradientEnd,
  text,
  icon,
  hasIcon,
  ...props
}) => {
  return (
    <Pressable onPress={onPress} width="full">
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={[gradientStart, gradientEnd]}
        style={styles.linearGradient}>
        {/* {hasIcon && (
          <Box mr="2">
            <MaterialIcon name={icon} size={15} color="black" />
          </Box>
        )} */}
        <Text
          textAlign="center"
          fontFamily="heading"
          fontSize="sm"
          fontWeight="semibold"
          letterSpacing="2xl"
          color={color}>
          {text}
        </Text>
      </LinearGradient>
    </Pressable>
  );
};
var styles = StyleSheet.create({
  linearGradient: {
    paddingVertical: 11,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 30,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default GradientButton;
