import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground
} from 'react-native';
import { SCREEN_NAMES } from '../../../constants/constants';
import Utils from '../../../utils/utils';

class Deck extends React.Component {
  render() {
    const imageBg = Utils.getRandomCardBgImage();
    const { deck, onPress, } = this.props;
    return (
      <View style={[styles.deck, this.props.styles]}>
        <TouchableOpacity
          onPress={() => {onPress(SCREEN_NAMES.DECK, { deckName: deck.name })}}
        >
          <ImageBackground style={[styles.deckInnerWrapper, { height: this.props.styles.height}]} source={imageBg}>
            <Text style={[styles.deckHeading, this.props.labelFontSize]}>{deck.label}</Text>
            <View style={styles.overlay} />
          </ImageBackground>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  deck: {
    backgroundColor: '#ffffff',
    marginTop: '2%',
    marginBottom: '2%',
    shadowColor: "#000",
    borderRadius: 2,
    shadowOffset: {
    	width: 0,
    	height: 1,
    },
    shadowOpacity: 0.42,
    shadowRadius: 2.22,
    elevation: 3,
    zIndex: 1
  },
  deckInnerWrapper: {
    padding: 10,
    backgroundColor: '#DDDDDD',
    zIndex: 0
  },
  deckHeading: {
    fontSize: 28,
    fontWeight: '200',
    color: '#FFFFFF',
    textAlign: 'center',
    zIndex: 1,
    paddingTop: '30%',
    fontFamily: 'HelveticaNeue-Thin'
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.57)',
    zIndex: -0
  },
});

export default Deck;
