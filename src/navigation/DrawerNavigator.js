import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {MainStackNavigator, ItemStackNavigator} from './StackNavigator';
import BottomTabNavigator from './BottomTabNavigator';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      {/* <Drawer.Screen name="Item" component={BottomTabNavigator} /> */}
      <Drawer.Screen name="Home" component={ItemStackNavigator} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
