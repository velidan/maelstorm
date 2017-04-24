import React, { Component } from "react";
import { Provider } from 'react-redux';

import AppNavigationWrapper from "./AppNavigationWrapper";


import storeCreator from "../storeCreator";
const store = storeCreator();

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigationWrapper />
      </Provider>
    );
  }
}