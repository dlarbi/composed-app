/**
* Displays link to login or subscribe
*/

import React from 'react';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
  Image
} from 'react-native';
import { BurstAndMoveEmitter } from 'react-native-particles'
import { Vector } from 'react-native-particles/';

import { BACKGROUND_IMAGES, IMAGES } from '../constants/constants';
import LoginContainer from '../containers/login-container';
import Deck from '../containers/components/deck/deck';

class LoginScreen extends React.Component {
  render() {
    const { navigate } = this.props.navigation;
    const { width, height } = Dimensions.get('window');
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <ImageBackground source={BACKGROUND_IMAGES.DARK_WOOD} style={styles.bgImage}>
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
            fromPosition={Vector(width / 2, height )}
            finalPoint={Vector(width / 2, -50)}
            ref={emitter => (this.emitter = emitter)}
            radius={600}
          >
            <Image
              style={styles.star}
              source={require('../assets/images/star.png')}
              resizeMode="stretch"
            />
          </BurstAndMoveEmitter>
          <View style={styles.logoWrapper}>
            <Image source={IMAGES.COMPOSED_LOGO} style={styles.logo}/>
          </View>
          <View style={styles.homeScreenCard}>
            <Deck deck={{}} onPress={() => {}} styles={{ width: '28%', height: 150 }}/>
          </View>
          <LoginContainer {...this.props}/>
        </ImageBackground>
      </>
    );
  }
};

const styles = StyleSheet.create({
  scrollView: {
    height: '100%'
  },
  bgImage: {
    width: '100%',
    top: 0,
    height: '100%'
  },
  homeScreenCard: {
    left: '50%',
    width: 400,
    marginLeft: -60
  },
  logoWrapper: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    textAlign: 'center',
    fontSize: 70,
    color: '#FFFFFF',
    fontFamily: 'SavoyeLetPlain',
    marginTop: 175,
    marginBottom: 50,
    height: 80,
    width: 250,
    resizeMode: 'contain'
  },
  particleContainer: {
    elevation: 2,
    zIndex: 10
  },
  star: {
    width: 24,
    height: 24,
    opacity: .6
  }
});

export default LoginScreen;
