import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Button from '../components/Button';
import {observer, inject} from 'mobx-react';
import DressStore from '../stores/DressStore';

const Home = inject('DressStore')(
  observer(({route, navigation}) => {
    const [dress, setDress] = React.useState(
      JSON.parse(JSON.stringify(DressStore.itemSet)),
    );
    const handleFinishButton = () => {
      navigation.navigate('Success');
    };
    return (
      <View style={styles.center}>
        <Text style={{fontSize: 25, marginBottom: 5, color: 'red'}}>
          Welcome to Dress Me App
        </Text>
        <Text style={{fontSize: 15, marginBottom: 10}}>
          You have completed {DressStore.completedSet} sets in overall , Thanks!
        </Text>
        <Text style={{fontSize: 15, marginBottom: 10}}>
          You Choose {3 - DressStore.itemSet.filter(i => i === null).length}/ 3
          items for collections
        </Text>
        <Button name="Shoes" navigation={navigation} />
        <Button name="Pants" navigation={navigation} />
        <Button name="Shirt" navigation={navigation} />

        {!DressStore.itemSet.includes(null) ? (
          <TouchableOpacity
            style={styles.Button}
            onPress={() => handleFinishButton()}>
            <View>
              <Text>finish button</Text>
            </View>
          </TouchableOpacity>
        ) : null}
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
  Button: {
    flexDirection: 'row',
    elevation: 10,
    backgroundColor: 'lightgreen',
    borderRadius: 20,
    height: 35,
    width: 140,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'darkblue',
    borderWidth: 2,
    marginTop: 10,
  },
  title: {
    fontSize: 20,
  },
});

export default Home;
