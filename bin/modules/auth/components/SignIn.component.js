import React, { Component, PropTypes } from 'react';

import {
  Text,
  Button,
  View,
  TextInput,
  Slider,
  Picker,
  Switch
} from 'react-native';

import Form from 'react-native-form';


export default class SignInComponent extends Component {

  static get navigationOptions() {
    return {
      title: 'Entry screen 1',
    };
  };



  render() {
    const { navigate } = this.props.navigation;

    return (
      <View>
        <Text>Hello,Maelstorm. Music genre randomizer!</Text>
        <Form ref="form">
          <TextInput placeholder="Login" type="TextInput" name="login"/>
          <TextInput secureTextEntry placeholder="Password" type="TextInput" name="password"/>

          <Button
            onPress={() => navigate('Home')}
            title="Sign In"
          />

          <Switch type="Switch" name="mySwitch"/>
          <Slider type="Slider" name="mySlider"/>
          <Picker type="Picker" name="myPicker"/>

        </Form>

      </View>
    );

  }
}

/**
 *
 * @type {{navigate: function}} -> s react stack navigator action ( move to )
 */
SignInComponent.propTypes = {
  navigate : PropTypes.func
};
