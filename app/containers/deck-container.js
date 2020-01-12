/**
* Displays one deck's list of cards
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
import LazyImage from '../components/lazy-image/lazy-image';

import { Vector } from 'react-native-particles/';
import { BACKGROUND_IMAGES } from '../constants/constants';
import { getCardsByDeckName } from '../api/decks-api';
import Utils from '../utils/utils';

class DeckContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: []
    };
  };

  componentDidMount = async () => {
    this.setState({
      loading: true
    });
    const cards = await getCardsByDeckName(this.props.navigation.state.params.deckName);
    this.setState(previousState => ({
      cards: cards,
      loading: false
    }));
  };

  getDeckBgImageArray = () => {
    return [...Array(this.state.cards.length).keys()].map(key =>
      Utils.getRandomCardBgImage()
    );
  };

  render () {
    const bgImageArray = this.getDeckBgImageArray();
    const { width, height } = Dimensions.get('window');

    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.container}>
          <ImageBackground source={BACKGROUND_IMAGES.DARK_WOOD} style={styles.bgImage}>
            {this.state.loading &&
              <ActivityIndicator size="large" color="#CCCCCC" style={styles.loading}/>
            }
            {this.state.cards.length > 0 &&
              <Swiper
                cards={this.state.cards}
                renderCard={(card, i) => {
                  const image = bgImageArray[i];
                  const splitSentence = Utils.splitSentenceForCard(card.text);
                  return (
                    <View style={styles.card}>
                      <LazyImage
                        source={image}
                        style={styles.cardImage}
                        loadingStyle={{alignItems:'center', width: '100%', height: '100%', backgroundColor: '#333'}}
                      />
                      <View style={styles.textWrapper}>
                        <Text style={styles.introText}>{splitSentence[0]}</Text>
                        <Text style={styles.text}>{splitSentence[1]}</Text>
                        <View style={styles.overlay} />
                      </View>
                    </View>
                  );
                }}
                onSwiped={(cardIndex) => {console.log(cardIndex)}}
                onSwipedAll={() => {console.log('onSwipedAll')}}
                cardIndex={0}
                infinite={true}
                backgroundColor={'transparent'}
                render
                stackSize= {2}>
              </Swiper>
            }

            <BurstAndMoveEmitter
              autoStart={true}
              numberOfParticles={20}
              interval={800}
              emissionRate={10}
              spread={300}
              speed={0}
              particleContainerStyle={styles.particleContainer}
              particleLife={1200}
              infiniteLoop={true}
              fromPosition={Vector(width / 2, 0 )}
              finalPoint={Vector(width / 2, height)}
              ref={emitter => (this.emitter = emitter)}
              radius={600}
            >
              <Image
                style={styles.star}
                source={require('../assets/images/star.png')}
                resizeMode="stretch"
              />
            </BurstAndMoveEmitter>
          </ImageBackground>
        </SafeAreaView>
      </>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    flex: 1,
    borderRadius: 18,
    marginBottom: 100,
    borderRadius: 8,
    backgroundColor: '#1d5067'
  },
  cardImage: {
    height: '100%',
    width: '100%',
    borderRadius: 18,
    position: 'absolute',
    zIndex: 0,
    top:0,
    left: 0,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.7)',
    zIndex: -0
  },
  textWrapper: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    top: 0,
    left: 0,
    zIndex: 10,
    paddingTop: '30%'
  },
  text: {
    textAlign: "center",
    fontSize: 24,
    backgroundColor: "transparent",
    color: '#FFFFFF',
    zIndex: 10,
    paddingRight: 30,
    paddingLeft: 30,
    paddingBottom: 30,
    lineHeight: 36,
    fontFamily: 'IowanOldStyle-Roman',
  },
  introText: {
    textAlign: "center",
    fontSize: 52,
    backgroundColor: "transparent",
    color: '#FFFFFF',
    zIndex: 10,
    fontWeight: 'bold',
    fontFamily: 'SavoyeLetPlain',
  },
  bgImage: {
    width: '100%',
    top: 0,
    height: '100%'
  },
  loading: {
    zIndex: 100,
    marginTop: '65%'
  },
  particleContainer: {
    elevation: 2,
    zIndex: 10
  },
  star: {
    width: 24,
    height: 24,
    opacity: .4
  }
});

export default DeckContainer;
