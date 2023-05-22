import React, {useContext} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Dimensions} from 'react-native';
import {ApiContext} from '../../index';
import {useDispatch} from 'react-redux';
import Home from '../screens/Home/Home';

const Drawer = createDrawerNavigator();

const DrawerRouter = () => {
  const api = useContext(ApiContext);
  const dispatch = useDispatch();
  return (
    <Drawer.Navigator
      initialRouteName="home"
      screenOptions={{
        swipeEdgeWidth: 0,
        drawerStyle: {
          width: Dimensions.get('window').width * 0.65,
        },
        drawerItemStyle: {
          borderRadius: 0,
          margin: 0,
          padding: 0,
        },
      }}
      // drawerContent={props => (
      //   <CustomDrawer
      //     {...props}
      //     onLogout={async () => await api.logout(dispatch)}
      //   />
      // )}
    >
      <Drawer.Screen
        name="home"
        component={Home}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
};

export default DrawerRouter;
