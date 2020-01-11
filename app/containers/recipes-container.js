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
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
  Image,
  TextInput
} from 'react-native';
import { BACKGROUND_IMAGES, ICONS } from '../constants/constants';
import RecipeCard from './components/recipe/recipe-card';
import RecipeCategory from './components/recipe/recipe-category';
import RecipesService from '../services/recipes-service';
import recipesStore from '../stores/recipes';

class RecipesContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      categories: []
    };
    this.willFocusSubscription = this.props.navigation.addListener(
      'willFocus',
      payload => {
        this.loadAllRecipes();
      }
    );
  };

  loadAllRecipes = async () => {
    this.setState({
      loading: true
    });
    await RecipesService.fetchRecipes();
    const recipes = recipesStore.getRecipes();
    this.setState(previousState => ({
      recipes,
      loading: false
    }));
  }

  componentDidMount = async () => {
    await this.loadAllRecipes();
  }

  componentWillUnmount() {
    this.willFocusSubscription.remove();
  }

  displayAllRecipes = () => {
    const recipes = recipesStore.getRecipes();
    this.setState(previousState => ({
      recipes,
      loading: false
    }));
  }

  searchTitle = async (text) => {
    this.setState({
      loading: true
    });
    if (!text.length) {
      this.displayAllRecipes();
      return;
    }
    await RecipesService.search({
      query: text,
      fields: ['title', 'directions', 'stats', 'ingredients', 'notes']
    });
    const recipes = recipesStore.getSearchedRecipes();
    this.setState(previousState => ({
      recipes,
      loading: false
    }));
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ImageBackground source={BACKGROUND_IMAGES.DARK_WOOD} style={styles.bgImage}>
            <ScrollView
              contentInsetAdjustmentBehavior="automatic"
              style={styles.scrollView}>

                <View style={styles.recipeContainer}>
                  <Text style={styles.recipesListHeading}>
                    Food is where healthy hormones start 🥙
                  </Text>
                  <View style={{width: '90%', marginBottom: 30}}>
                  {
                    this.state.categories.map((category, i) => {
                      return (
                        <RecipeCategory deck={{name: undefined, label: category}}
                          key={i}
                          labelStyle={{ fontSize: 44 }}
                        />
                      )
                    })
                  }
                  </View>
                  <TextInput
                    style={styles.searchBarStyle}
                    onChangeText={(text) => this.searchTitle(text)}
                    value={this.state.searchTitleValue}
                    placeholder="Search ingredients, time to cook, etc..."
                    placeholderTextColor="white"
                  />
                  <Text style={styles.recipesListHeading}>
                    Browse all recipes
                  </Text>
                  {this.state.loading ?
                    <ActivityIndicator size="large" color="#CCCCCC" style={styles.loading}/>
                    :
                    this.state.recipes.map((recipe, i) => {
                      return (
                        <RecipeCard recipe={recipe} />
                      );
                    })
                  }
                </View>
            </ScrollView>
          </ImageBackground>
        </SafeAreaView>
      </>
    );
  }
};

const styles = StyleSheet.create({
  bgImage: {
    height: '100%',
  },
  scrollView: {
    backgroundColor: 'transparent'
  },
  recipeContainer: {
    flex: 1,
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    paddingTop: '5%'
  },
  loading: {
    zIndex: 100,
    marginTop: '35%',
    width: '100%'
  },
  recipesListHeading: {
    fontFamily: 'HelveticaNeue-Thin',
    color: '#FFFFFF',
    fontSize: 28,
    width: '90%'
  },
  completedStat: {
    color: '#0fb80f'
  },
  recipeCount: {
    fontWeight: '800',
    fontSize: 20
  },
  searchBarStyle: {
    height: 35,
    padding: 10,
    width: '90%',
    color: '#ffffff',
    backgroundColor: '#444444',
    opacity: .6,
    borderRadius: 4,
    marginBottom: 10
  }

});

export default RecipesContainer;
