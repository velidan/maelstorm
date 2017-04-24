import { Platform } from 'react-native';
import {createStore, applyMiddleware, compose} from 'redux';
import devTools from 'remote-redux-devtools';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers/index';

//const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);

export default function configureStore(initialState) {
  const enhancer = compose(
    applyMiddleware(thunkMiddleware),
    devTools({
      name: Platform.OS,
      hostname: 'localhost',
      port: 5678
    })
  );
  return createStore(rootReducer, initialState, enhancer);
}

