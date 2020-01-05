/**
* Displays list of decks
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
  ActivityIndicator
} from 'react-native';
import { BACKGROUND_IMAGES } from '../constants/constants';
import Deck from './components/deck/deck';
import { getDecks } from '../api/decks-api';

class DecksContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      decks: []
    };
  };

  componentDidMount = async () => {
    this.setState({
      loading: true
    });
    const decks = await getDecks();
    this.setState(previousState => ({
      decks: decks,
      loading: false
    }));
  };

  render() {
    const { navigate } = this.props.navigation;

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
                <View style={styles.deckContainer}>
                  {
                    this.state.decks.map((deck, i) => {
                      return (
                        <Deck deck={deck} onPress={navigate} key={i} styles={{ width: '45%', height: 250 }} />
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
  deckContainer: {
    flex: 1,
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    paddingTop: '2%'
  },
  loading: {
    zIndex: 100,
    marginTop: '65%'
  }
});

export default DecksContainer;
