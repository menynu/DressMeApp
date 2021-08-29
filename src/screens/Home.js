import React from 'react';
import {View, Button, Text, StyleSheet} from 'react-native';

const Home = () => {
  return (
    <View style={styles.center}>
      <Text>Welcome to Dress Me App</Text>
      <Button title="Go to Item Screen" />
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
