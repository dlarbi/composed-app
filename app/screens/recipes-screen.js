/**
* Displays list of recipes
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

import RecipesContainer from '../containers/recipes-container';

class RecipesScreen extends React.Component {
  render() {
    return (
      <RecipesContainer {...this.props} />
    );
  }
};

export default RecipesScreen;
