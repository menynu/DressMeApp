import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

export default Button = props => {
  return (
    <TouchableOpacity
      style={styles.Button}
      onPress={() => props.navigation.navigate(props.name, {name: props.name})}>
      <Text>{props.name}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  Button: {
    flexDirection: 'row',
    elevation: 10,
    backgroundColor: 'lightblue',
    borderRadius: 20,
    height: 35,
    width: 140,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'darkblue',
    borderWidth: 2,
    marginTop: 10,
  },
});
