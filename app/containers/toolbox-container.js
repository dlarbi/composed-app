/**
* Displays list of tools
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
import AppIntroSlider from 'react-native-app-intro-slider';

import { BACKGROUND_IMAGES, SCREEN_NAMES } from '../constants/constants';
import selfStore from '../stores/self';
import ToolsService from '../services/tools-service';
import UsersService from '../services/users-service';

import ToolsSelector from '../selectors/tools';
import ToolCard from './components/tool/tool-card';
import ToolboxIntroSlides from './components/toolbox/toolbox-intro-slides';

class ToolboxContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tools: [],
      displayIntro: true
    };
  };

  // gets toolbox data according to the category, time, etc specifications entered by the user
  loadFilteredToolBoxData = async (category, ms) => {
    this.setState({
      loading: true
    });
    const tools = await ToolsService.fetchFilteredToolboxForUser({ category, ms });
    this.setState(previousState => ({
      tools: ToolsSelector.selectFilteredToolboxForUser(),
      loading: false
    }));
  }

  loadAllToolboxData = async () => {
    this.setState({
      loading: true
    });
    const user = await selfStore.getUser();
    const tools = await ToolsService.fetchToolsByUserId(user.id);
    this.setState(previousState => ({
      tools: ToolsSelector.selectLoggedInUserToolbox(),
      loading: false
    }));
  }

  componentDidMount = async () => {
    await this.loadAllToolboxData();
  };

  handleToggleToolToUsersToolbox = async (toolId) => {
    try {
      await UsersService.toggleToolIdToLoggedInUser(toolId);
      this.setState({
        tools: ToolsSelector.selectLoggedInUserToolbox()
      });
    } catch (err) {
      console.log(err)
      console.log('Show an error in the UI');
    }
  };

  renderItem = ({ item }) => {
    return (
      <ImageBackground style={styles.slide} source={BACKGROUND_IMAGES.TWINKLING_STARS}>
        {item.content.image &&
          <Image source={item.content.image} style={styles.bgImage} />
        }
        {item.content.image &&
          <View style={styles.overlay} />
        }
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.text}>{item.content && item.content.text}</Text>
        <View style={styles.overlay} />
      </ImageBackground>
    );
  }

  onToolboxDone = () => {
    this.props.navigation.navigate(SCREEN_NAMES.TOOLS);
  }

  onIntroDone = () => {
    this.setState({
      displayIntro: false
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <>
        <StatusBar barStyle="dark-content" />
        {this.state.loading ?
          <ActivityIndicator size="large" color="#CCCCCC" style={styles.loading}/>
          :
          <SafeAreaView style={styles.introWrapper}>
            {this.state.displayIntro ?
              <ToolboxIntroSlides tools={this.state.tools} onDone={this.onIntroDone} />
              :
              <AppIntroSlider slides={this.state.tools} renderItem={this.renderItem} bottomButton onDone={this.onToolboxDone} />
            }
          </SafeAreaView>
        }
      </>
    );
  }
};

const styles = StyleSheet.create({
  loading: {
    zIndex: 100,
    marginTop: '65%'
  },
  introWrapper: {
    zIndex: 300,
    position:'absolute',
    top:0,
    left:0,
    height: '100%',
    width: '100%'
  },
  bgImage: {
    top: 0,
    left: 0,
    position: 'absolute',
    height: '100%',
    zIndex: 0
  },
  image: {
    width: 200,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 30
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: -0
  },
  title: {
    fontSize: 36,
    fontFamily: 'HelveticaNeue-Bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
    zIndex: 1
  },
  text: {
    fontSize: 22,
    fontFamily: 'HelveticaNeue-Thin',
    color: '#FFFFFF',
    textAlign: 'center',
    zIndex: 1,
  },
  slide: {
    height: '100%',
    width: '100%',
    backgroundColor: '#68c3b6',
    justifyContent: 'center',
    alignItems: 'center'
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.7)',
    zIndex: -0
  },
});

export default ToolboxContainer;
