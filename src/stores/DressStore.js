import {makeAutoObservable, runInAction} from 'mobx';
import {makePersistable} from 'mobx-persist-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

class DressStore {
  itemSet = new Array(3);
  itemStore = [];
  constructor() {
    let sets;
    makeAutoObservable(this);
    makePersistable(
      this,
      {
        name: 'DressStore',
        properties: ['itemStore', 'sets', 'itemSet'], // num of completed sets
        storage: AsyncStorage, //check for future set
        removeOnExpiration: false,
        stringify: true, //would be set to true
        debugMode: true,
      },
      {delay: 200, fireImmediately: false},
    );
    this.fetchDataAsync();
    this.mySet();
    console.log('arr length: ', this.itemSet.length);
  }

  get getDressData() {
    return this.itemStore;
  }

  mySet = () => {
    this.sets = 2;
  };

  addToCart = item => {
    console.log('item is added, the item:', item);
    switch (item.type) {
      case 'Shoes':
        this.itemSet[0] = item;
        console.log('shoes added!! ', itemSet[0]);
        break;
      case 'Pants':
        this.itemSet[1] = item;
        break;
      case 'Shirt':
        this.itemSet[2] = item;
    }
  };

  fetchDataAsync = async () => {
    console.log('fetching data');
    fetch('http://www.mocky.io/v2/5e3940013200005e00ddf87e?mocky-delay=600ms')
      .then(response => {
        if (response.ok) {
          return response.json();
        }
      })
      .then(data => {
        if (data.results) {
          runInAction(() => {
            this.itemStore = data.results.sort((a, b) =>
              a.name > b.name ? 1 : -1,
            );
          });
        }
      })
      .catch(err => console.log(err));
  };
}

const dressStore = new DressStore();

export default dressStore;
