import { createStore } from 'redux';
import rootReducer from './reducer';
const store = createStore(rootReducer);
export default store;

store.subscribe(() => {
  console.log(store.getState());
});