/**
* Displays a Toolbox's details
*/
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View, 
  Text,
  StatusBar,
  Button
} from 'react-native';

import ToolboxContainer from '../containers/toolbox-container';

class ToolboxScreen extends React.Component {
  render() {
    return (
      <ToolboxContainer {...this.props} />
    );
  }
};

export default ToolboxScreen;
