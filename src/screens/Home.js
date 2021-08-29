import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Button from '../components/Button';
const Home = ({route, navigation}) => {
  return (
    <View style={styles.center}>
      <Text>Welcome to Dress Me App</Text>
      <Button name="Shoes" navigation={navigation} />
      <Button name="Pants" navigation={navigation} />
      <Button name="Shirts" navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
});

export default Home;
