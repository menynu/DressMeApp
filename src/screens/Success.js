import React from 'react';
import {View, Text, StyleSheet, Button, Image} from 'react-native';
import {observer, inject} from 'mobx-react';
import DressStore from '../stores/DressStore';

const Success = inject('DressStore')(
  observer(({route, navigation}) => {
    const [dress, setDress] = React.useState(
      JSON.parse(JSON.stringify(DressStore.itemSet)),
    );
    const handleClick = () => {
      DressStore.setTime();
      DressStore.finishDress();
      navigation.navigate('Home');
    };

    return (
      <View style={styles.center}>
        <Text style={{color: 'green', fontSize: 22, marginBottom: 20}}>
          Congratulation! you have completed a dressing set!
        </Text>
        <Image
          source={{
            uri: `https://picsum.photos/200?${Date.now()}`, // fix the image cache problem
          }}
          style={{width: 200, height: 200}}
        />
        <Text style={{fontSize: 15, marginBottom: 10}}>
          It took you {Math.round((Date.now() - DressStore.time) / 1000)}{' '}
          seconds to choose!
        </Text>
        <Text style={{fontSize: 15}}>
          Sum of the shoes and pants sizes :
          {dress[0].selectedSize + dress[1].selectedSize}
        </Text>
        <View style={{flexDirection: 'row'}}>
          {dress.map((item, index) => {
            const {type, name, brand, selectedSize, selectedColor} = item;
            return (
              <View style={{flexDirection: 'column', margin: 5}}>
                <Text
                  style={{fontSize: 22, color: 'orange', fontWeight: 'bold'}}>
                  {type}
                </Text>
                <Text>Name : {name}</Text>
                <Text>Brand : {brand} </Text>
                <Text>Size : {selectedSize}</Text>
                <Text>Color : {selectedColor}</Text>
              </View>
            );
          })}
        </View>
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
