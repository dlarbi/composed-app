/**
* Displays a deck
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

import DeckContainer from '../containers/deck-container';

class DeckScreen extends React.Component {
  render() {
    return (
      <DeckContainer {...this.props} />
    );
  }
};

export default DeckScreen;
