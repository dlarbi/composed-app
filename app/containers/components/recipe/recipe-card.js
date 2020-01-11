import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground
} from 'react-native';
import LazyImage from '../../../components/lazy-image/lazy-image';
import { SCREEN_NAMES, ICONS } from '../../../constants/constants';
import Utils from '../../../utils/utils';

class RecipeCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardBodyStyle: {
        height: 0,
        padding: 0
      }
    };
  }

  isCardBodyHidden = () => {
    return this.state.cardBodyStyle.height === 0
  }

  toggleCardBody = () => {
    const newCardBodyState = this.isCardBodyHidden() ?
      { cardBodyStyle: { height: 'auto', padding: 10 } } :
      { cardBodyStyle: { height: 0, padding: 0 } };
    this.setState(newCardBodyState);
  }

  render() {
    const imageBg = Utils.getRandomRecipeBgImage();
    const { recipe, onPress, } = this.props;
    return (
      <TouchableOpacity style={styles.recipeCard}>
        <View style={styles.recipeCardImageWrapper}>
          <LazyImage
            source={{uri: recipe.image.Location}}
            style={styles.recipeCardImage}
            loadingStyle={{alignItems:'center', width: '100%', height: '100%', backgroundColor: '#dddddd'}}
          />
        </View>
        <View style={styles.recipeCardHeader}>
          <Text style={styles.header}>
            {recipe.title}
          </Text>
        </View>
        <View style={[styles.recipeCardBody, this.state.cardBodyStyle]}>

          <View style={styles.recipeSectionWrapper}>
            <Text style={styles.recipeSubHeader}>Ingredients</Text>
            {
              recipe.ingredients.map((ingredient) => {
                return (
                  <View style={styles.recipeText}>
                    <Text>{ingredient}</Text>
                  </View>
                );
              })
            }
          </View>
          <View style={styles.recipeSectionWrapper}>
            <Text style={styles.recipeSubHeader}>Directions</Text>
            {
              recipe.directions.map((direction) => {
                return (
                  <View style={styles.recipeText}>
                    <Text>{direction}</Text>
                  </View>
                );
              })
            }
          </View>
          <View style={styles.recipeSectionWrapper}>
            <Text style={styles.recipeSubHeader}>Notes</Text>
            {
              recipe.notes.map((note) => {
                return (
                  <View style={styles.recipeText}>
                    <Text>{note}</Text>
                  </View>
                );
              })
            }
          </View>
        </View>
        <View style={styles.recipeCardFooter}>
          <View style={styles.recipeCardStat}>
            <Image source={ICONS.CLOCK} style={styles.statIcon} />
            <Text style={styles.recipeCardStatText}>{recipe.stats.time}</Text>
          </View>
          <View style={styles.recipeCardStat}>
            <Image source={ICONS.VEGETABLES} style={styles.statIcon} />
            <Text style={styles.recipeCardStatText}>{recipe.stats.ingredients}</Text>
          </View>
          <View style={styles.recipeCardStat}>
            <Image source={ICONS.PLATE} style={styles.statIcon} />
            <Text style={styles.recipeCardStatText}>{recipe.stats.servings}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={this.toggleCardBody} style={styles.toggleExpandButton}>
          <Text style={styles.toggleExpandButtonText}>
            {this.isCardBodyHidden() ? 'Full Recipe' : 'Hide' }
          </Text>
        </TouchableOpacity>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  recipeCard: {
    width: '90%',
    backgroundColor: '#ffffff',
    marginTop: 15,
    marginBottom: 30,
    borderRadius: 8
  },
  recipeCardImageWrapper: {
    width: '100%',
    height: 180
  },
  recipeCardImage: {
    width: '100%',
    height: '100%',
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8
  },
  recipeCardHeader: {
    padding: 10,
  },
  recipeCardBody: {
    padding: 10,
  },

  header: {
    fontSize: 18,
    color: '#68c3b6',
    fontFamily: 'HelveticaNeue-Bold'
  },
  text: {
    fontSize: 14,
    fontFamily: 'HelveticaNeue-Thin'
  },
  recipeSectionWrapper: {
    marginBottom: 20
  },
  recipeSubHeader: {
    fontWeight: '800',
  },
  recipeText: {
    borderBottomColor: '#CCCCCC',
    paddingTop: 5,
    paddingBottom: 5
  },
  recipeCardFooter: {
    padding: 10,
    justifyContent: 'space-around',
    flexDirection: 'row'
  },
  recipeCardStat: {
    width: '33.3%',
    alignItems: 'center',
  },
  recipeCardStatText: {
    fontSize: 14,
    fontFamily: 'HelveticaNeue-Thin',
  },
  toggleExpandButton: {
    alignItems: 'center',
    padding: 10,
    paddingBottom: 15
  },
  toggleExpandButtonText: {
    fontSize: 16,
    fontFamily: 'HelveticaNeue',
    color: '#68c3b6'
  },
  statIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginBottom: 5
  }
});

export default RecipeCard;
