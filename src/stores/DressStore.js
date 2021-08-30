import {makeAutoObservable, runInAction} from 'mobx';
import {makePersistable} from 'mobx-persist-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

class DressStore {
  itemSet = [];
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
      {delay: 200, fireImmediately: true},
    );
    this.fetchDataAsync();
    // this.mySet();
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
        this.sets = 1;
        this.mySet();
        runInAction(() => {
          this.itemSet[0] = item;
        });
        break;
      case 'pants':
        this.itemSet[1] = item;
        break;
      case 'shirt':
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
