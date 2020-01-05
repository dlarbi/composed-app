/**
 * The Composed Nutrition App
 * Dean Larbi
 *
 * @format
 * @flow
 */

import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { SCREEN_NAMES, TAB_NAMES, ICONS } from './constants/constants';
import ProfileScreen from './screens/profile-screen';
import LoginScreen from './screens/login-screen';
import RegisterScreen from './screens/register-screen';
import DecksScreen from './screens/decks-screen';
import DeckScreen from './screens/deck-screen';
import ToolsScreen from './screens/tools-screen';
import ToolScreen from './screens/tool-screen';
import ToolboxScreen from './screens/toolbox-screen';
import RecipesScreen from './screens/recipes-screen';
import RecipeScreen from './screens/recipe-screen';
import NavigationService from './services/navigation-service';

const LoginNavigator = createStackNavigator({
  [SCREEN_NAMES.LOGIN]: { screen: LoginScreen },
  [SCREEN_NAMES.REGISTER]: { screen: RegisterScreen },
}, {
  headerMode: 'none'
});

const DecksNavigator = createStackNavigator({
  [SCREEN_NAMES.DECKS]: {
    screen: DecksScreen
  },
  [SCREEN_NAMES.DECK]: {
    screen: DeckScreen,
    navigationOptions: {
      header: null
    }
  }
});

const ToolsNavigator = createStackNavigator({
  [SCREEN_NAMES.TOOLS]: { screen: ToolsScreen },
  [SCREEN_NAMES.TOOLBOX]: { screen: ToolboxScreen },
  [SCREEN_NAMES.TOOL]: { screen: ToolScreen },
});

const RecipesNavigator = createStackNavigator({
  [SCREEN_NAMES.RECIPE]: { screen: RecipeScreen },
  [SCREEN_NAMES.RECIPES]: { screen: RecipesScreen }
});

const Tabs = createBottomTabNavigator(
  {
    [TAB_NAMES.TOOLBOX]: ToolsNavigator,
    [TAB_NAMES.RECIPES]: RecipesNavigator,
    [TAB_NAMES.DECKS]: DecksNavigator,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        if (routeName === TAB_NAMES.DECKS) {
          return (<Image source={ICONS.DECKS_ICON} style={styles.tabIcon} />)
        } else if (routeName === TAB_NAMES.TOOLBOX) {
          return (<Image source={ICONS.TOOLBOX_TAB_ICON} style={styles.tabIcon} />)
        } else if (routeName === TAB_NAMES.RECIPES) {
          return (<Image source={ICONS.RECIPES_TAB_ICON} style={styles.tabIcon} />)
        }
        return (<View></View>);
      },
    }),
    tabBarOptions: {
      activeTintColor: '#68c3b6',
      inactiveTintColor: 'gray',
    },
  }
);

const AppContainer = createAppContainer(
  createSwitchNavigator({
    [SCREEN_NAMES.LOGIN]: LoginNavigator,
    App: Tabs
  }), {
    initialRouteName: SCREEN_NAMES.LOGIN
  }
);

const styles = StyleSheet.create({
  tabIcon: {
    width: 25,
    maxHeight: 35,
    padding: 5,
    opacity: .7,
    resizeMode: 'contain'
  }
})

export default class App extends React.Component {
  render() {
    return (
      <AppContainer
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    );
  }
}
