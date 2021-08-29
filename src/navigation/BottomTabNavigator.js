import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MainStackNavigator, ContactStackNavigator} from './StackNavigator';
import Home from '../screens/Home';
import Item from '../screens/Item';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Shoes" component={Home} />
      <Tab.Screen name="Pants" component={Item} />
      <Tab.Screen name="Shirts" component={MainStackNavigator} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
