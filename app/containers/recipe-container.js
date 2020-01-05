/**
* Displays one recipe's list of cards
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
import Swiper from 'react-native-deck-swiper';
import { BurstAndMoveEmitter } from 'react-native-particles'
import { Vector } from 'react-native-particles/';
import { BACKGROUND_IMAGES } from '../constants/constants';
import { getCardsByRecipeName } from '../api/recipes-api';
import Utils from '../utils/utils';

class RecipeContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: {}
    };
  };

  render () {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.container}>
          <Text>Recipe</Text>
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

export default RecipeContainer;
