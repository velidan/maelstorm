/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  Button,
  View,
  TextInput,
  Slider,
  Picker,
  Switch
} from 'react-native';
import { StackNavigator } from 'react-navigation';

import Form from 'react-native-form'


import HomeModule from "./modules/home/Home.module";

export default class EntryModule extends Component {

  static navigationOptions = {
    title: 'Entry screen 1',
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View>
        <Text>Hello,Maelstorm. Music genre randomizer!</Text>
        <Form ref="form">
          <TextInput  placeholder="Login" type="TextInput" name="login" />
          <TextInput  secureTextEntry placeholder="Password" type="TextInput" name="password" />

          <Button
            onPress={() => navigate('Home')}
            title="Sign In"
          />

          <Switch type="Switch" name="mySwitch" />
          <Slider type="Slider" name="mySlider" />
          <Picker type="Picker" name="myPicker" />

        </Form>

      </View>
    );

  }
}


const maelstorm = StackNavigator({
  Entry: { screen: EntryModule },
  Home: { screen : HomeModule }
});

AppRegistry.registerComponent('maelstorm', () => maelstorm);