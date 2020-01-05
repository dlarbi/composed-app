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
        this.loadData();
      }
    );
  };

  loadData = async () => {
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
    await this.loadData();
  }

  componentWillUnmount() {
    this.willFocusSubscription.remove();
  }

  searchTitle = async (text) => {
    this.setState({
      loading: true
    });
    await RecipesService.search({ "title": text });
    const recipes = recipesStore.getSearchedRecipes();
    this.setState(previousState => ({
      recipes,
      loading: false
    }));
  }

  render() {
    const { navigate } = this.props.navigation;
    console.log(this.state)
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ImageBackground source={BACKGROUND_IMAGES.DARK_WOOD} style={styles.bgImage}>
            {this.state.loading &&
              <ActivityIndicator size="large" color="#CCCCCC" style={styles.loading}/>
            }
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
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: 100, backgroundColor: '#ffffff' }}
                    onChangeText={(text) => this.searchTitle(text)}
                    value={this.state.searchTitleValue}
                  />
                  <Text style={styles.recipesListHeading}>
                    Browse all recipes
                  </Text>
                  {
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
    marginTop: '65%'
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


});

export default RecipesContainer;
