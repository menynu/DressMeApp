import {makeAutoObservable, runInAction} from 'mobx';
import {makePersistable, clearPersistedStore} from 'mobx-persist-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

class DressStore {
  itemSet = new Array(3);
  itemStore = [];
  completedSet = 0;
  constructor() {
    let sets;
    itemStore = [];
    makeAutoObservable(this);
    makePersistable(
      this,
      {
        name: 'DressStore',
        properties: ['itemStore', 'sets', 'itemSet', 'completedSet'], // num of completed sets
        storage: AsyncStorage, //check for future set
        removeOnExpiration: false,
        stringify: true, //would be set to true
        debugMode: true,
      },
      {delay: 200, fireImmediately: false},
    );
    this.fetchDataAsync();
  }

  async clearStoredDate() {
    await clearPersistedStore(this);
  }
  get getDressData() {
    return this.itemStore;
  }

  mySet = () => {
    this.sets = 2;
  };

  addToCart = item => {
    console.log('item is added, the item:', item);
    console.log('item type= ', item.type);
    this.mySet();
    switch (item.type) {
      case 'shoes':
        this.itemSet[0] = item;
        break;
      case 'pants':
        this.itemSet[1] = item;
        break;
      case 'shirt':
        this.itemSet[2] = item;
    }
  };

  finishDress = () => {
    console.log('finish dressed press');
    this.completedSet += 1;
    // this.clearStoredDate;
    // AsyncStorage.removeItem('itemSet');
    this.itemSet = [null, null, null];
    // this.itemSet = new Array(3);
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
