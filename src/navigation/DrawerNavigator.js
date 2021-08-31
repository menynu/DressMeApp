import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {ItemStackNavigator} from './StackNavigator';
import '@react-navigation/stack';
import Success from '../screens/Success';
const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Select Shoes"
        onPress={() => props.navigation.navigate('Shoes', {name: 'Shoes'})}
      />
      <DrawerItem
        label="Select Pants"
        onPress={() => props.navigation.navigate('Pants', {name: 'Pants'})}
      />
      <DrawerItem
        label="Select Shirt"
        onPress={() => props.navigation.navigate('Shirt', {name: 'Shirt'})}
      />
    </DrawerContentScrollView>
  );
}

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}>
      {/* <Drawer.Screen name="Item" component={BottomTabNavigator} /> */}
      <Drawer.Screen
        name="Home"
        component={ItemStackNavigator}
        screenOptions={{
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
