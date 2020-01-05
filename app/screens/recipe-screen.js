/**
* Displays list of recipe
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

import RecipeContainer from '../containers/recipe-container';

class RecipeScreen extends React.Component {
  render() {
    return (
      <RecipeContainer {...this.props} />
    );
  }
};

export default RecipeScreen;
