import React, { Component } from "react";
import { View, Text, Picker } from "react-native";


const Item = Picker.Item;

const genres = {
  rock : {
    label : "Rock",
    value : "12"
  },
  electronic : {
    label : "Electronic",
    value : "15"
  },
  country : {
    label : "Country",
    value : "9"
  },
};


export default class HomeModule extends Component {

  constructor(props) {
    super(props);

    this.state = {
      defaultGenre : {
        label : "Rock",
        value : "12"
      }
    }

  }

  _onGenreSelect = genreId => {
    console.log("genreId selected => ", genreId);
    this.setState({ ...this.state, defaultGenre : { ...this.state.defaultGenre, value : genreId } })
  };

  static navigationOptions = {
    title : "Home Module"
  };

  render() {
    return (
      <View>
        <Text>Home Module content</Text>


        <Picker
          selectedValue={this.state.defaultGenre.value}
          onValueChange={this._onGenreSelect}>
          <Picker.Item label={ genres.rock.label } value={ genres.rock.value } />
          <Picker.Item label={ genres.country.label } value={ genres.country.value } />
          <Picker.Item label={ genres.electronic.label } value={ genres.electronic.value } />
        </Picker>

      </View>
    )
  }
}