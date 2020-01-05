/**
* Displays one tool's list of cards
*/
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text, 
  StatusBar,
  ImageBackground,
  ActivityIndicator,
  Dimensions,
  Image
} from 'react-native';
import Swiper from 'react-native-tool-swiper';
import { BurstAndMoveEmitter } from 'react-native-particles'
import { Vector } from 'react-native-particles/';
import { BACKGROUND_IMAGES } from '../constants/constants';
import { getCardsByToolName } from '../api/tools-api';
import Utils from '../utils/utils';

class ToolContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: {}
    };
  };

  componentDidMount = async () => {

  };

  render () {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.container}>
          <Text>Tool</Text>
        </SafeAreaView>
      </>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default ToolContainer;
