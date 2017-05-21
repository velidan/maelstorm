import React, { Component } from "react";
import PropTypes from 'prop-types';

import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import { View, Text, Picker, Button , ListView, StyleSheet , PermissionsAndroid} from "react-native";
import PlaylistComponent from "../playlist/Playlist.component";


import RNFetchBlob from 'react-native-fetch-blob'

const Sound = require('react-native-sound');


import { fetchGenreSoundsAction, fetchGenreAction, fetchSoundInfoAction } from "./actions";

const Item = Picker.Item;



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
      selectedGenre : {
        label : "Loading music genres...",
        value : 0
      },
      isGenresLoaded : false,
      playlistTrackCount : 20
    }

  }

  static navigationOptions = {
    title : "Home Module"
  };



  _fetchGenreSet = () => {
    this.props.fetchGenreAction()
      .then(data => {
        this.setState({  ...this.state, isGenresLoaded : true })
      });
  };

  _fetchSoundsByGenre = () => {
    //const genreId = 12; // TODO: should get it from the genre selector
    this.props.fetchGenreSoundsAction(this.state.selectedGenre.value)
      .then(res => res.dataset[Math.floor(Math.random() * 20) + 0].track_id)
      .then(trackId => this.props.fetchSoundInfoAction(trackId))
      .then(trackInfo => {
        console.log("trackInfo => ", trackInfo);

        RNFetchBlob
          .config({
            fileCache : true,
            // by adding this option, the temp files will have a file extension
            appendExt : 'mp3',
            path : `/sdcard/Music/${trackInfo.dataset[0].track_title}.mp3`
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
//   const genres = {
//   rock : {
//     label : "Rock",
//     value : "12"
//   },
//   electronic : {
//     label : "Electronic",
//     value : "15"
//   },
//   country : {
//     label : "Country",
//     value : "9"
//   },
// };


  // shouldComponentUpdate(nextProps) {
  //   return nextProps.parentGenres.length;
  // }



  componentDidMount() {
    this._fetchGenreSet();
  };

  _onGenreSelect = genreId => {
    console.log("genreId selected => ", genreId);
    this.setState({ ...this.state, selectedGenre : { ...this.state.selectedGenre, value : genreId } })
  };

  _generateGenres = () => {
    const PARENT_GENRES = this.props.parentGenres;
    let res = ( <Picker.Item
      label={ this.state.selectedGenre.label }
      value={ this.state.selectedGenre.value } /> );

    if (PARENT_GENRES.length) {
      res = PARENT_GENRES.map(genre => (
             <Picker.Item label={ genre.genre_title } value={ genre.genre_id } key={ genre.genre_id } />)
            );
    }

    return res;
  };

  _generatePlaylist = () => {
    this.props.fetchGenreSoundsAction(this.state.selectedGenre.value, this.state.playlistTrackCount);
  };


  _downloadPlaylist = () => {
    console.log("download playlist");
    this._fetchSoundsByGenre();
  };

  // _getPlaylistItems = () => {
  //   let res = null;
  //
  //   const playlist = this.props.playlist;
  //   if (playlist.length) {
  //       let res = playlist.map(track => {
  //         return (
  //
  //         )
  //       })
  //   }
  //
  // };


  render() {
    return (
      <View>

        <Text>Select a music genre</Text>
        <Picker
          selectedValue={this.state.selectedGenre.value}
          onValueChange={this._onGenreSelect}
          >
          { this._generateGenres() }
        </Picker>


        <Button
          onPress={this._downloadPlaylist}
          title="Download playlist"
          color="#841584"
          accessibilityLabel="Donwnload the playlist"
        />

        <Button
          onPress={this._generatePlaylist}
          title="Generate playlist"
          disabled={ !this.state.isGenresLoaded }
          color="#252830"
          accessibilityLabel="Generate the random playlist"
        />

        <Button
          onPress={this.playSoundBundle}
          title="Play"
          color="#125793"
          accessibilityLabel="Play music"
        />


       <PlaylistComponent playlistData = {this.props.sounds.playlist} />

      </View>
    )
  }
}

HomeModule.propTypes = {
  parentGenres : PropTypes.array.isRequired,
  sounds : PropTypes.object,

  fetchGenreSoundsAction : PropTypes.func.isRequired,
  fetchGenreAction : PropTypes.func.isRequired,
  fetchSoundInfoAction : PropTypes.func.isRequired
};

const mapStateToProps = state => {
  console.log("state ==> ", state);
  return {
    parentGenres : state.genres.parents,
    sounds : state.sounds
  }
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    fetchGenreSoundsAction : ( genreId, playlistTrackCount ) => fetchGenreSoundsAction(genreId, playlistTrackCount),
    fetchGenreAction : genreId => fetchGenreAction(),
    fetchSoundInfoAction : trackId => fetchSoundInfoAction(trackId)
  }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeModule);