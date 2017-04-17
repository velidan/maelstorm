import React, { Component } from "react";
import { View, Text } from "react-native";

export default class HomeModule extends Component {
  static navigationOptions = {
    title : "Home Module"
  };

  render() {
    return (
      <View>
        <Text>Home Module content</Text>
      </View>
    )
  }
}