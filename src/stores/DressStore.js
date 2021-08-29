import {makeAutoObservable} from 'mobx';

class DressStore {
  constructor() {
    makeAutoObservable(this);
  }
}

const dressStore = new DressStore();

fetch('http://www.mocky.io/v2/5e3940013200005e00ddf87e?mocky-delay=600ms')
  .then(response => {
    if (response.ok) {
      return response.json();
    }
  })
  .then(data => {
    if (data.results) {
      console.log('results:', data.results);
    }
  })
  .catch(err => console.log(err));

export default dressStore;
