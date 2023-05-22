import React from 'react';
import {HStack, Box, Text, Pressable} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import BackButton from './BackButton';
import {DrawerActions} from '@react-navigation/native';
import HeaderIcon from '../assets/svg/Menu.svg';
import WalletIcon from '../assets/svg/Wallet.svg';

const Header = ({navigation, title, color = 'primary.300', back = true}) => {
  return (
    <HStack width="full" alignItems="center" mb="6">
      <Box width="1/5">
        {back ? (
          <BackButton onPress={() => navigation.goBack()} />
        ) : (
          <Pressable
            w="6"
            h="6"
            onPress={() => navigation.navigate('dashboard')}>
            <WalletIcon width="100%" height="100%" fill="red" />
          </Pressable>
        )}
      </Box>
      <Box width="3/5">
        {title && (
          <Text
            textAlign="center"
            fontWeight="600"
            fontSize="2xl"
            color={color}>
            {title}
          </Text>
        )}
      </Box>
      <HStack
        width="1/5"
        flexDirection="row"
        alignItems="center"
        justifyContent="flex-end"
        space="3">
        <Icon name="bell" size={20} color="#fff" />
        <Pressable
          onPress={() => navigation.toggleDrawer()}
          w="8"
          justifyContent="center"
          alignItems="center"
          h="8">
          <HeaderIcon width="22" height="22" fill="#fff" />
        </Pressable>
      </HStack>
    </HStack>
  );
};

export default Header;
