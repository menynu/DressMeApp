import React, {useState} from 'react';
import {View, StyleSheet, Text, Button, Alert} from 'react-native';
import {observer, inject} from 'mobx-react';
import DressStore from '../stores/DressStore';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Item = inject('DressStore')(
  observer(({route, navigation}) => {
    const [size, setSize] = useState(null);
    const [itemList, setItemList] = useState(
      JSON.parse(JSON.stringify(DressStore.itemStore)),
    );

    const addItem = (item, size, color) => {
      let Item = {
        ...item,
        selectedColor: color,
        selectedSize: size,
      };
      DressStore.addToCart(Item);
      navigation.navigate('Home');
    };

    return (
      <View style={styles.center}>
        <Text>
          {' '}
          You have{' '}
          {
            itemList.filter(
              item => item.type == route.params.name.toLowerCase(),
            ).length
          }{' '}
          {route.params.name} to choose
        </Text>

        {itemList.map((item, index) => {
          return item.type == route.params.name.toLowerCase() ? (
            <View key={index} style={styles.card}>
              <Text style={{textAlign: 'center', marginEnd: 10}}>
                name: {item.name}
                brand: {item.brand}
              </Text>
              <Text style={{flexDirection: 'row'}}>
                {item.colors.map((clr, i) => {
                  return (
                    <>
                      <View
                        key={i}
                        style={{
                          backgroundColor: clr,
                          margin: 2,
                          width: '15%',
                        }}>
                        <TouchableOpacity
                          style={{flexDirection: 'row'}}
                          onPress={() => {
                            setSize(item.id);
                          }}>
                          <View style={{flexDirection: 'row'}}>
                            <Text style={{flexDirection: 'row'}}>Choose</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                      <View>
                        {size == item.id ? (
                          <View key={i}>
                            {item.sizes.map((s, i) => {
                              return (
                                <View key={i}>
                                  <TouchableOpacity
                                    onPress={() => {
                                      Alert.alert(
                                        'Item selection:',
                                        `Do you want this ${item.type}?`,
                                        [
                                          {
                                            text: 'Cancel',
                                            onPress: () => {
                                              return null;
                                            },
                                          },
                                          {
                                            text: 'Confirm',
                                            onPress: () => {
                                              //add item to store
                                              addItem(item, s, clr);
                                            },
                                          },
                                        ],
                                      );
                                    }}>
                                    <Text>{s} </Text>
                                  </TouchableOpacity>
                                </View>
                              );
                            })}
                          </View>
                        ) : null}
                      </View>
                    </>
                  );
                })}
              </Text>
            </View>
          ) : null;
        })}

        <Text>
          This is the Item selection screen this is {route.params.name}
        </Text>
        <Button title="Finish Button" onPress={() => navigation.goBack()} />
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
  card: {
    borderWidth: 0,
    borderRadius: 10,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 2},
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 20,
    width: '99%',
    height: 35,
    flex: 1,
  },
  Btn: {
    width: '5%',
    height: 10,
    flexDirection: 'row',
  },
});

export default Item;
