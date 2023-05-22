import {FormControl, Input, useTheme, Text} from 'native-base';
import React from 'react';
import {NativeSyntheticEvent, TextInputFocusEventData} from 'react-native';

const FormField = ({
  handleChange,
  handleBlur,
  variant,
  label,
  placeholder,
  InputRightElement,
  color,
  error,
  type,
  touched,
  value,
  ...props
}) => {
  const {colors} = useTheme();
  return (
    <FormControl {...props} mb="0">
      <FormControl.Label
        fontSize="xs"
        fontWeight="500"
        color={colors.textGray[400]}
        m="0"
        p="0">
        {label}
      </FormControl.Label>
      <Input
        value={value}
        p="0"
        isInvalid={touched && error ? true : false}
        onChangeText={handleChange}
        onBlur={handleBlur}
        type={type}
        fontSize="sm"
        fontWeight="500"
        variant={variant}
        // placeholder={placeholder}
        placeholderTextColor={colors.textGray[400]}
        borderColor={colors.textGray[400]}
        InputRightElement={InputRightElement}
      />
      <Text fontSize="xs" color="danger.700" m="0">
        {error && touched && error}
      </Text>
    </FormControl>
  );
};

export default FormField;
