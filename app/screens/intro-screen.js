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

import Intro from '../components/intro/intro';

class IntroScreen extends React.Component {
  render() {
    return (
      <Intro {...this.props} />
    );
  }
};

export default IntroScreen;
