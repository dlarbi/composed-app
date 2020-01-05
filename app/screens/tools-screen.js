/**
* Displays list of tools
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

import ToolsContainer from '../containers/tools-container';

class ToolsScreen extends React.Component {
  render() {
    return (
      <ToolsContainer {...this.props} />
    );
  }
};

export default ToolsScreen;
