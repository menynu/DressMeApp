import React, {useState} from 'react';
import {View, StyleSheet, Text, Button, Alert, TextInput} from 'react-native';
import {observer, inject} from 'mobx-react';
import DressStore from '../stores/DressStore';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Item = inject('DressStore')(
  observer(({route, navigation}) => {
    const [size, setSize] = useState(null);
    const [search, setSearch] = useState('');
    const [itemList, setItemList] = useState(
      JSON.parse(
        JSON.stringify(
          DressStore.itemStore.filter(
            obj => obj.type == route.params.name.toLowerCase(),
          ),
        ),
      ),
    );
    const [filtered, setFiltered] = useState(
      itemList.filter(obj => obj.type == route.params.name.toLowerCase()),
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

    const searchFilterFunction = text => {
      if (text) {
        const newData = filtered.filter(function (item) {
          return (
            item.sizes.includes(text.toLowerCase()) ||
            item.name.includes(text.toLowerCase()) ||
            item.brand.includes(text.toLowerCase()) ||
            item.colors.includes(text.toLowerCase())
          );
        });
        setFiltered(newData);
        setSearch(text);
      } else {
        if (text.length < 2) {
          setFiltered(itemList.slice(0, 5));
          setSearch(text);
        }
      }
    };

    return (
      <View style={styles.center}>
        <TextInput
          style={styles.txtInput}
          placeholder="search.. "
          onChangeText={text => searchFilterFunction(text)}
        />
        {console.log('list:', filtered)}
        <Text>
          {' '}
          You have {filtered.length} / {itemList.length}
          {route.params.name} to choose
        </Text>

        {filtered.map((item, index) => {
          return (
            <View key={index} style={styles.card}>
              <Text
                style={{
                  textAlign: 'center',
                  margin: 5,
                }}>
                name: {item.name}
                brand: {item.brand}
              </Text>
              <Text
                style={{flexDirection: 'row', textAlign: 'justify', flex: 1}}>
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
                      <View style={{flex: 1, margin: 5}}>
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
                                    <Text style={{flex: 1}}>{s} </Text>
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
          );
        })}
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
    marginTop: 10,
    // marginBottom: 0,
    width: '99%',
    height: 40,
    flex: 1,
    flexGrow: 2,
  },
  Btn: {
    width: '5%',
    height: 10,
    flexDirection: 'row',
  },
  txtInput: {
    marginTop: 10,
    height: 50,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 5,
  },
});

export default Item;
