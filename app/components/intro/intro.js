import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import ToolCard from '../../containers/components/tool/tool-card';
import UsersService from '../../services/users-service';
import ToolsService from '../../services/tools-service';
import ToolsSelector from '../../selectors/tools';
import { IMAGES } from '../../constants/constants';

const slides = [
  {
    key: '1',
    title: 'Your health isn\'t just the food you eat',
    text: 'Health is in your community, your environment, your physical body, and your feelings.',
    bgImage: IMAGES.KRISTA_SLIDE_IMAGE,
    backgroundColor: '#59b2ab',
  },
  {
    key: '2',
    title: 'Simple Daily Habits',
    text: 'We\'ll help you enrich your body, mind, and spirit with easy reminders and only a few minutes a day.',
    image: IMAGES.COMPOSED_LOGO,
    backgroundColor: '#febe29',
  },
  {
    key: '3',
    title: 'Lets Start Small!', 
    text: 'Community can be as simple as sending a friendly text.',
    addToolHandle: true,
    backgroundColor: '#22bcb5',
  }
];

const FRIENDLY_TEXT_TOOL_ID = 'bc0a7da9-af91-4884-a22d-86a23cc4739f';

export default class Intro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showRealApp: false,
      tool: {}
    };
  }

  componentDidMount = async () => {
    await ToolsService.fetchToolById(FRIENDLY_TEXT_TOOL_ID);
    this.setState({
      tool: ToolsSelector.selectToolById(FRIENDLY_TEXT_TOOL_ID)
    });
  }

  handleClickTool = (toolId) => {
    this.props.handleToggleToolToUsersToolbox(toolId);
    this.onDone();
  }

  renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        {item.bgImage &&
          <Image source={item.bgImage} style={styles.bgImage} />
        }
        {item.bgImage &&
          <View style={styles.overlay} />
        }
        {item.image &&
          <Image source={item.image} style={styles.image} />
        }
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>{item.text}</Text>
        {item.addToolHandle &&
          <ToolCard
            tool={this.state.tool}
            handleToggleToolToUsersToolbox={this.handleClickTool}
          />
        }
      </View>
    );
  }

  onDone = () => {
    this.setState({ showRealApp: true });
  }

  render() {
    if (this.state.showRealApp || !Object.keys(this.state.tool).length) {
      return null;
    }
    return (
      <View style={styles.introWrapper}>
        <AppIntroSlider slides={slides} renderItem={this.renderItem} bottomButton onDone={this.onDone} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
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
    textAlign: 'center'

  },
  slide: {
    height: '100%',
    width: '100%',
    backgroundColor: '#68c3b6',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
