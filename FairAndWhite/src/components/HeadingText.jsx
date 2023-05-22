import {Box, Text, useTheme} from 'native-base';
import React from 'react';

const HeadingText = ({heading, text}) => {
  const {colors} = useTheme();
  return (
    <Box flex="1" justifyContent="center">
      <Text fontWeight="500" fontSize="2xl" lineHeight="md">
        {heading}
      </Text>
      <Text fontSize="sm" fontWeight="semibold" color={colors.textGray[400]}>
        {text}
      </Text>
    </Box>
  );
};

export default HeadingText;
