/**
* Displays link to login or subscribe
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
  Image
} from 'react-native';

import { BACKGROUND_IMAGES, IMAGES } from '../constants/constants';
import RegisterContainer from '../containers/register-container';
import Deck from '../containers/components/deck/deck';

class RegisterScreen extends React.Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <ImageBackground source={BACKGROUND_IMAGES.DARK_WOOD} style={styles.bgImage}>
          <View style={styles.logoWrapper}>
            <Image source={IMAGES.COMPOSED_LOGO} style={styles.logo}/>
          </View>
          <Text style={styles.subHeader}>
            Registration
          </Text>

          <RegisterContainer {...this.props}/>

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
  subHeader: {
    textAlign: 'center',
    fontSize: 30,
    color: '#FFFFFF',
    fontFamily: 'HelveticaNeue-Thin',
    paddingTop: 20
  }
});

export default RegisterScreen;
