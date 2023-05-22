import {useTheme, Text, Select, CheckIcon, Box} from 'native-base';
import React from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const FormSelect = ({
  handleChange,
  handleBlur,
  variant,
  label,
  placeholder,
  InputRightElement,
  color,
  error,
  type,
  options,
  touched,
  value,
  ...props
}) => {
  const {colors} = useTheme();
  return (
    <Box>
      <Select
        selectedValue={value}
        w="110"
        placeholderTextColor={colors.primary[800]}
        placeholder={placeholder}
        fontSize="sm"
        fontWeight="500"
        variant={variant}
        borderColor={color}
        InputRightElement={InputRightElement}
        isInvalid={touched && error ? true : false}
        _selectedItem={{endIcon: <CheckIcon color={color} size={1} />}}
        dropdownOpenIcon={
          <MaterialIcon
            name="chevron-up"
            size={15}
            color={colors.primary[800]}
          />
        }
        dropdownCloseIcon={
          <MaterialIcon
            name="chevron-down"
            size={15}
            color={colors.primary[800]}
          />
        }
        onValueChange={handleChange}
        onBlur={handleBlur}>
        {options.map((item, index) => (
          <Select.Item
            key={index}
            label={item.label}
            value={item.value}
            color="primary.600"
          />
        ))}
      </Select>
    </Box>
  );
};

export default FormSelect;
