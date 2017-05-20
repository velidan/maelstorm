import React, { Component } from "react";
import PropTypes from 'prop-types';

import { ListView, StyleSheet, View, Text, Image } from "react-native";

import PlayListRowComponent from './Playlist-row.component';


const styles = StyleSheet.create({
  container : {
    flex : 1,
    marginTop : 20,
    height: 200,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da'
  },
  container1: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: 12,
    fontSize: 16,
  },
  photo: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
});


class PlaylistComponent extends React.Component {

  constructor(props) {
    super(props);


    this.state = {
      dataSource: null
    };

  }

  componentWillReceiveProps(props) {
    if (props.playlistData.length) {
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.setState({ ...this.state, dataSource : ds.cloneWithRows(props.playlistData), })

      // const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      // this.setState({ ...this.state,
      //   dataSource: ds.cloneWithRows([{ track_image_file : "https://cdn.pornpics.com/pics/2016-10-29/244624_02big.jpg", track_title : "Some Track"}]),
      // });
    }

  }

// <ListView
// style={styles.container}
// dataSource={this.state.dataSource}
// renderRow={(data) => <PlayListRowComponent {...this.props.playlistData} />}
// />

  getContent = () => {
    let res = null;
    const dataSource = this.state.dataSource;

    if (dataSource) {
      res = (
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(data) => <PlayListRowComponent {...data} />}
        />
      )

      // res = (
      //   <ListView
      //     dataSource={this.state.dataSource}
      //     renderRow={(rowData) => {
      //       return <View style={styles.container1}>
      //         <Image source={{ uri: rowData.track_image_file}} style={styles.photo} />
      //         <Text style={styles.text}>
      //           { rowData.track_title }
      //         </Text>
      //       </View>
      //     }}
      //   />
      // )
    }

    return res;

  };

  /*
   * Removed for brevity
   */
  render() {

    return (
       this.getContent()
    );
  }
}

export default PlaylistComponent;