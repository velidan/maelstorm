import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: 12,
    marginRight: 50,
    fontSize: 16,
  },
  progress: {
    marginLeft: 'auto',
    fontSize: 16,
  },
  ready : {
    color : "forestgreen",
    marginLeft: 'auto',
  },
  photo: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
});

class PlayListRowComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={{ uri: this.props.track_image_file}} style={styles.photo} />
        <Text style={styles.text}>
          { this.props.track_title }
        </Text>

        { this.props.loading && <Text style={ styles.progress }>
          { this.props.loadingProgress + "%" }
        </Text> }

        { this.props.ready && <Text style={ styles.ready }>
          OK
        </Text> }


      </View>
    );
  }
}


export default PlayListRowComponent;