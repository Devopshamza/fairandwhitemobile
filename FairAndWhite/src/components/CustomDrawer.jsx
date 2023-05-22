import React from 'react';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {Box, useTheme, Image, Text, HStack, Divider, VStack} from 'native-base';
import {Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const menuItems = [
  {
    label: 'Dashboard',
    route: 'dashboard',
  },
  {
    label: 'Wallet & Rewards',
    route: 'home',
  },
  {
    label: 'Cart',
    route: 'home',
  },
  {
    label: 'Orders',
    route: 'home',
  },
  {
    label: 'Switch Grow',
    route: 'deviceList',
  },
  {
    label: 'Start New Grow',
    route: 'deviceList',
  },
  {
    label: 'Settings',
    route: 'setting',
  },
  {
    label: 'Grow Home',
    route: 'home',
  },
];

const Drawer = props => {
  const {colors} = useTheme();
  return (
    <Box flex="1" maxWidth={`${Dimensions.get('window').width * 0.65}`}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{
          backgroundColor: colors.darkBg[400],
          flex: 1,
        }}>
        <Box flex="1" justifyContent="center">
          <Box p="5">
            <Image
              source={require('../assets/images/dummyProfile.png')}
              width="20"
              h="20"
              borderRadius="45"
              resizeMode="cover"
              alt="profile"
            />
            <Text fontWeight="700" fontSize="2xl">
              John Doe
            </Text>
            <Text fontSize="xs">test@gmail.com</Text>
          </Box>

          <Box mb="10">
            {menuItems.map((item, index) => (
              <VStack key={index}>
                <DrawerItem
                  onPress={() => props.navigation.navigate(item.route)}
                  style={{
                    width: '100%',
                    height: 45,
                    paddingLeft: 0,
                    paddingBottom: 0,
                  }}
                  label={({isPressed, focused}) => (
                    <Box m="0">
                      <HStack
                        width="full"
                        p="0"
                        bg={isPressed ? ' amber.200' : ''}
                        alignItems="center"
                        justifyContent="space-between">
                        <Text fontWeight="500">{item.label}</Text>
                        <Icon
                          name="arrow-forward-ios"
                          size={10}
                          color={colors.textGray[400]}
                        />
                      </HStack>
                    </Box>
                  )}
                />
                <Divider />
                {/* {index !== menuItems.length - 1 && <Divider />} */}
              </VStack>
            ))}
          </Box>

          <DrawerItem
            onPress={async () => {
              await props.onLogout();
            }}
            style={{width: '100%'}}
            label={({isPressed}) => (
              <Box m="0">
                <HStack
                  width="full"
                  p="0"
                  bg={isPressed ? ' amber.200' : ''}
                  alignItems="center"
                  justifyContent="space-between">
                  <Text
                    fontWeight="600"
                    fontSize="xs"
                    color={colors.primary[600]}
                    letterSpacing="1">
                    LOGOUT
                  </Text>
                </HStack>
              </Box>
            )}
          />
        </Box>
      </DrawerContentScrollView>
    </Box>
  );
};

export default Drawer;
