import {makeAutoObservable, runInAction} from 'mobx';
import {makePersistable} from 'mobx-persist-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

class DressStore {
  //   componentDidMount() {}

  itemStore = [];
  constructor() {
    makeAutoObservable(this);
    makePersistable(
      this,
      {
        name: 'DressStore',
        properties: ['itemStore', 'sets'], // num of completed sets
        storage: AsyncStorage, //check for future set
        removeOnExpiration: false,
        stringify: true, //would be set to true
        debugMode: true,
      },
      {delay: 200, fireImmediately: false},
    );
    this.fetchDataAsync();
  }
  get getDressData() {
    return this.itemStore;
  }
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

/*
export class DressCollectionStore {
  constructor(dressStore) {
    makeAutoObservable(this, {
      pants: {
        id: '',
        size: '',
        brand: '',
        name: '',
        color: '',
      },
      shoes: {
        id: '',
        size: '',
        brand: '',
        name: '',
        color: '',
      },
      shirts: {
        id: '',
        size: '',
        brand: '',
        name: '',
        color: '',
      },
    });
    this.dressStore = dressStore;


}
*/
export default dressStore;
