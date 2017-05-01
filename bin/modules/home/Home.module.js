import React, { Component, PropTypes } from "react";
import { connect } from 'react-redux'
import { View, Text, Picker, Button , PermissionsAndroid} from "react-native";

import RNFetchBlob from 'react-native-fetch-blob'

const Sound = require('react-native-sound');


import { fetchGenreSoundsAction, fetchGenreAction, fetchSoundInfoAction } from "./actions";

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


class HomeModule extends Component {

  constructor(props) {
    super(props);






   // this.props.fetchGenreAction();

   // console.log(Sound);
    //console.log(Sound.MAIN_BUNDLE);

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



    // RNFetchBlob
    //   .config({
    //     fileCache : true,
    //     // by adding this option, the temp files will have a file extension
    //     appendExt : 'mp3',
    //     path : "/sdcard/Music/some.mp3"
    //   })
    //   .fetch('GET', 'https://files.freemusicarchive.org/music/Music_for_Video/Mscaras/Mscara_vs_Mscara/Mscaras_-_05_-_NewYorican.mp3', {
    //     "Content-Type" : "application/octet-stream"
    //   })
    //   .progress({ count : 10 }, (received, total) => {
    //     console.log('progress', received / total)
    //   })
    //   .then((res) => {
    //     RNFetchBlob.fs.scanFile([ { path : res.path(), mime : 'audio/mpeg' } ])
    //   console.log("ress ====>>", res);
    //     // the temp file path with file extension `png`
    //     console.log('The file saved to ', res.path());
    //
    //     this.playSoundBundle = () => {
    //       const s = new Sound(res.path(), '', (e) => {
    //         if (e) {
    //           console.log('error', e);
    //         } else {
    //           s.setSpeed(1);
    //           console.log('duration', s.getDuration());
    //           s.play(() => s.release()); // Release when it's done so we're not using up resources
    //         }
    //       });
    //     };
    //
    //     this.playSoundBundle();
    //
    //     // Beware that when using a file path as Image source on Android,
    //     // you must prepend "file://"" before the file path
    //
    //   });

    // async function requestCameraPermission() {
    //   try {
    //     const granted = await PermissionsAndroid.request(
    //       PermissionsAndroid.PERMISSIONS.CAMERA,
    //       {
    //         'title': 'Cool Photo App Camera Permission',
    //         'message': 'Cool Photo App needs access to your camera ' +
    //         'so you can take awesome pictures.'
    //       }
    //     )
    //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //       console.log("You can use the camera")
    //     } else {
    //       console.log("Camera permission denied")
    //     }
    //   } catch (err) {
    //     console.warn(err)
    //   }
    // }
    //
    // requestCameraPermission();

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
    this.props.fetchGenreAction();
  };

  _fetchSoundsByGenre = () => {
    const genreId = 12; // TODO: should get it from the genre selector
    this.props.fetchGenreSoundsAction(genreId)
      .then(res => res.dataset[Math.floor(Math.random() * 20) + 0].track_id)
      .then(trackId => this.props.fetchSoundInfoAction(trackId))
      .then(trackInfo => {
        console.log("trackInfo => ", trackInfo)

        RNFetchBlob
          .config({
            fileCache : true,
            // by adding this option, the temp files will have a file extension
            appendExt : 'mp3',
            path : "/sdcard/Music/some.mp3"
          })
          .fetch('GET', `https://files.freemusicarchive.org/${trackInfo.dataset[0].track_file}`, {
            "Content-Type" : "application/octet-stream"
          })
          .progress({ count : 10 }, (received, total) => {
            console.log('progress', received / total)
          })
          .then((res) => {
            RNFetchBlob.fs.scanFile([ { path : res.path(), mime : 'audio/mpeg' } ]);
          console.log("ress ====>>", res);
            // the temp file path with file extension `png`
            console.log('The file saved to ', res.path());

            this.playSoundBundle = () => {
              const s = new Sound(res.path(), '', (e) => {
                if (e) {
                  console.log('error', e);
                } else {
                  s.setSpeed(1);
                  console.log('duration', s.getDuration());
                  s.play(() => s.release()); // Release when it's done so we're not using up resources
                }
              });
            };

            this.playSoundBundle();

            // Beware that when using a file path as Image source on Android,
            // you must prepend "file://"" before the file path

          });

      })

    //fetchSoundInfoAction

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
          title="Get genres"
          color="#841584"
          accessibilityLabel="Get music Genres"
        />

        <Button
          onPress={this._fetchSoundsByGenre}
          title="Get sound"
          color="#252830"
          accessibilityLabel="Get first sound of a selected genre"
        />

        <Button
          onPress={this.playSoundBundle}
          title="Play"
          color="#125793"
          accessibilityLabel="Play music"
        />

      </View>
    )
  }
}

HomeModule.propTypes = {
  fetchGenreSoundsAction : PropTypes.func.isRequired,
  fetchGenreAction : PropTypes.func.isRequired,
  fetchSoundInfoAction : PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    fetchGenreSoundsAction : genreId => {
      return dispatch(fetchGenreSoundsAction(genreId));
    },
    fetchGenreAction : genreId => {
      return dispatch(fetchGenreAction());
    },
    fetchSoundInfoAction : trackId => {
      return dispatch(fetchSoundInfoAction(trackId));
    }
  }
};

export default connect(undefined, mapDispatchToProps)(HomeModule);