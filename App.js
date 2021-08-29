/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import DrawerNavigator from './src/navigation/DrawerNavigator';
import {Provider, observer} from 'mobx-react';
import dressStore from './src/stores/DressStore';

const App = observer(() => {
  return (
    <Provider DressStore={dressStore}>
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
    </Provider>
  );
});
export default App;
