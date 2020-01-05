/**
* Displays list of decks
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

import DecksContainer from '../containers/decks-container';

class DecksScreen extends React.Component {
  render() {
    return (
      <DecksContainer {...this.props} />
    );
  }
};

export default DecksScreen;
