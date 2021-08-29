import React, {useState} from 'react';
import {View, StyleSheet, Text, Button} from 'react-native';
import {observer, inject} from 'mobx-react';
import DressStore from '../stores/DressStore';

const Item = inject('DressStore')(
  observer(({Id, Brand, Colors, Sizes, Name, route, navigation}) => {
    const [itemList, setItemList] = useState(
      JSON.stringify(DressStore.itemStore),
    );

    return (
      <View style={styles.center}>
        <Text>
          This is the Item selection screen this is {route.params.name}
          {console.log('new: ', itemList)}
          {/* {console.log(`this is test: ${DressStore.itemStore}`)} */}
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
});

export default Item;
