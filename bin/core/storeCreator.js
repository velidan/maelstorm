// import { Platform } from 'react-native';
// import {createStore, applyMiddleware, compose} from 'redux';
// import devTools from 'remote-redux-devtools';
// import thunkMiddleware from 'redux-thunk';
// import rootReducer from './reducers/index';
//
// //const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);
//
// export default function configureStore(initialState) {
//   const enhancer = compose(
//     applyMiddleware(thunkMiddleware),
//     devTools({
//       name: Platform.OS,
//       hostname: 'localhost',
//       port: 5678
//     })
//   );
//   return createStore(rootReducer, initialState, enhancer);
// }
//


import { Platform } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducer from './reducers';

const middlewares = [thunk];
const enhancer = composeWithDevTools(
  {
    name: Platform.OS,
    hostname: 'localhost'
  }
)(applyMiddleware(...middlewares));

export default function configureStore(initialState) {
  const store = createStore(reducer, initialState, enhancer);
  if (module.hot) {
    module.hot.accept(() => {
      store.replaceReducer(require('./reducers').default);
    });
  }
  return store;
}