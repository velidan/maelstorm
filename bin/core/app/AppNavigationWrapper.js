import React, { Component } from "react";
import { addNavigationHelpers } from 'react-navigation';
import { connect} from 'react-redux';

import AppNavigator from "./AppNavigator";

class AppNavigationWrapper extends Component {
  render() {
    return (
      <AppNavigator navigation={addNavigationHelpers({
        dispatch: this.props.dispatch,
        state: this.props.nav,
      })} />
    );
  }
}

function mapStateToProps (state) {
  return {
    nav: state.nav
  }
}

export default connect(mapStateToProps)(AppNavigationWrapper);