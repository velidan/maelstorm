import React, { Component } from "react";
import { View, Text, Picker, Button } from "react-native";


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

  static navigationOptions = {
    title : "Home Module"
  };

  _onGenreSelect = genreId => {
    console.log("genreId selected => ", genreId);
    this.setState({ ...this.state, defaultGenre : { ...this.state.defaultGenre, value : genreId } })
  };

  _fetchGenreSet = () => {
    console.log("fetch genre set");
  };



  render() {
    return (
      <View>

        <Text>Select a music genre</Text>
        <Picker
          selectedValue={this.state.defaultGenre.value}
          onValueChange={this._onGenreSelect}>
          <Picker.Item label={ genres.rock.label } value={ genres.rock.value } />
          <Picker.Item label={ genres.country.label } value={ genres.country.value } />
          <Picker.Item label={ genres.electronic.label } value={ genres.electronic.value } />
        </Picker>


        <Button
          onPress={this._fetchGenreSet}
          title="Get sound"
          color="#841584"
          accessibilityLabel="Get first sound of a selected genre"
        />

      </View>
    )
  }
}