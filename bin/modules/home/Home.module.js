import React, { Component } from "react";
import { View, Text, Picker, Button } from "react-native";

const Sound = require('react-native-sound');


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


    console.log(Sound);
    console.log(Sound.MAIN_BUNDLE);

    this.playSoundBundle = () => {
      const s = new Sound('getup.mp3', Sound.MAIN_BUNDLE, (e) => {
        if (e) {
          console.log('error', e);
        } else {
          s.setSpeed(1);
          console.log('duration', s.getDuration());
          s.play(() => s.release()); // Release when it's done so we're not using up resources
        }
      });
    };

    // this.playSoundLooped = () => {
    //   if (this.state.loopingSound) {
    //     return;
    //   }
    //   const s = new Sound('advertising.mp3', Sound.MAIN_BUNDLE, (e) => {
    //     if (e) {
    //       console.log('error', e);
    //     }
    //     s.setNumberOfLoops(-1);
    //     s.play();
    //   });

//     this.music = new Sound('getup.mp3', Sound.MAIN_BUNDLE, (error) => {
//       if (error) {
//         console.log('failed to load the sound', error);
//         return;
//       }
//       // loaded successfully
//       console.log('duration in seconds: ' + this.music.getDuration() + 'number of channels: ' + this.music.getNumberOfChannels());
//     });
//
// // Play the sound with an onEnd callback
//     this.music.play((success) => {
//       if (success) {
//         console.log('successfully finished playing');
//       } else {
//         console.log('playback failed due to audio decoding errors');
//       }
//     });


    // Get properties of the player instance
//     console.log('volume: ' + this.playSoundBundle.getVolume());
//     console.log('pan: ' + this.playSoundBundle.getPan());
//     console.log('loops: ' + this.playSoundBundle.getNumberOfLoops());
//
// // Seek to a specific point in seconds
//     this.playSoundBundle.setCurrentTime(2.5);
//
// // Get the current playback point in seconds
//     this.playSoundBundle.getCurrentTime((seconds) => console.log('at ' + seconds));


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
        <Button
          onPress={this.playSoundBundle}
          title="Play"
          color="#841584"
          accessibilityLabel="Play music"
        />

      </View>
    )
  }
}