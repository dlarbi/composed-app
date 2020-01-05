/**
* Displays a Tool's details
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

import ToolContainer from '../containers/tools-container';

class ToolScreen extends React.Component {
  render() {
    return (
      <ToolContainer {...this.props} />
    );
  }
};

export default ToolScreen;
