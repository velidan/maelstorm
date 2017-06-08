import React, { Component, PropTypes } from "react";
import { View, Text, Button } from "react-native";

export default class PlayerModule extends Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    title: 'Player',
  };

  render() {

    const { navigate } = this.props.navigation;

    return(
      <View>

        <Text>Player</Text>

        <Button
          onPress={() => navigate('Home')}
          title="Go Home"
        />

      </View>
    )
  }

}

/**
 *
 * @type {{navigate: function}} -> s react stack navigator action ( move to )
 */
PlayerModule.propTypes = {
  navigate : PropTypes.func
};