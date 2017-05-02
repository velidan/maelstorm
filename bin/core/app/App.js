import React, { Component } from "react";
import { Provider } from 'react-redux';

import AppNavigationWrapper from "./AppNavigationWrapper";


import storeCreator from "../storeCreator";
const store = storeCreator();

console.log("store ===> ", store.getState() );

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigationWrapper />
      </Provider>
    );
  }
}