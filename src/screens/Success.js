import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {observer, inject} from 'mobx-react';
import DressStore from '../stores/DressStore';

const Success = inject('DressStore')(
  observer(({route, navigation}) => {
    const [time, setTime] = React.useState(DressStore.time);
    const [dress, setDress] = React.useState(
      JSON.parse(JSON.stringify(DressStore.itemSet)),
    );
    console.log('item set: ', dress);
    console.log('shoe size:', dress[0].selectedSize);
    const handleClick = () => {
      DressStore.setTime();
      DressStore.finishDress();
      navigation.navigate('Home');
    };
    return (
      <View style={styles.center}>
        <Text>Success Screen</Text>
        <Text>
          It took you {Math.round((Date.now() - DressStore.time) / 1000)}{' '}
          seconds to choose!
        </Text>
        <Text>
          Sum of the shoes and pants sizes :
          {dress[0].selectedSize + dress[1].selectedSize}
        </Text>
        <Button
          title="Choose another set"
          onPress={() => {
            handleClick();
          }}
        />
      </View>
    );
  }),
);

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
});

export default Success;
