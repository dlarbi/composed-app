import React from 'react';
import { StyleSheet, View, Text, Image, Picker } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import ToolCard from '../tool/tool-card';
import UsersService from '../../../services/users-service';
import ToolsService from '../../../services/tools-service';
import ToolsSelector from '../../../selectors/tools';
import { IMAGES } from '../../../constants/constants';

class TimePicker extends React.Component {
  state = { timeAvailable: '5000' }
  selectTimeAvailable = (ms) => {
    console.log(ms)
    this.setState({ timeAvailable: ms });
  }
  render() {
    return (
    <View style={{width: '100%'}}>
      <Picker selectedValue={this.state.timeAvailable} onValueChange={this.selectTimeAvailable}>
        <Picker.Item label='5 minutes' value='5000' />
        <Picker.Item label='15 minutes' value='15000' />
        <Picker.Item label='30 minutes' value='30000' />
        <Picker.Item label='60+ minutes' value='60000' />
      </Picker>
      <Text style = {styles.text}>{this.state.user}</Text>
    </View>
    )
  }
}

const slides = [
  {
    name: 'Welcome to your toolbox 😌',
    content: {
      text: 'First, pick a category'
    },
    categoryPicker: true // This slide shows a list of categories the user can pick from
  },
  {
    name: 'How much time can you spend?',
    content: {
      text: ''
    },
    timePicker: true // This slide shows a list of categories the user can pick from
  }
];


export default class ToolboxIntroSlides extends React.Component {
  constructor(props) {
    super(props);
  }

  getCategories = () => {
    return this.props.tools.reduce((result, tool) => {
      if (!tool.category) {
        return result;
      }
      tool.category.forEach(category => {
        if (result.indexOf(category) === -1) {
          result.push(category);
        }
      })
      return result;
    }, []);
  }

  getCategoryIcon = (category) => {
    const iconsByCategory = {
      reflect: '🌊',
      taste: '🥝',
      mindbody: '🧘',
      movement: '🏃',
      sound: '😴'
    }
    return iconsByCategory[category];
  }

  renderCategoryPicker = () => {
    const categories = this.getCategories();
    return (
      <View style={styles.categoryPicker}>
        {categories.map(category => {
          return (
            <View style={styles.category}>
              <View><Text style={styles.categoryIcon}>{this.getCategoryIcon(category)}</Text></View>
              <Text style={styles.categoryText}>{category}</Text>
            </View>
          );
        })}
      </View>
    );
  }

  renderTimePicker = () => {
    const categories = this.getCategories();
    return (
      <View style={styles.timePicker}>
        <TimePicker />
      </View>
    );
  }

  renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        {item.content.image &&
          <Image source={item.content.image} style={styles.bgImage} />
        }
        {item.content.image &&
          <View style={styles.overlay} />
        }
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.text}>{item.content && item.content.text}</Text>
        {item.categoryPicker &&
          this.renderCategoryPicker()
        }
        {item.timePicker &&
          this.renderTimePicker()
        }
        <View style={styles.overlay} />
      </View>
    );
  }

  onDone = () => {
    this.props.onDone()
  }

  render() {
    // if (!Object.keys(this.props.tools).length) {
    //   return null;
    // }
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
    marginBottom: 15,
    zIndex: 1
  },
  text: {
    fontSize: 22,
    fontFamily: 'HelveticaNeue-Thin',
    color: '#FFFFFF',
    textAlign: 'center',
    zIndex: 1
  },
  slide: {
    height: '100%',
    width: '100%',
    backgroundColor: '#68c3b6',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  categoryPicker: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    zIndex: 1,
    width: '100%',
    marginTop: 30
  },
  category: {
    width: '33%',
    justifyContent: 'space-around',
    padding: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  categoryIcon: {
    fontSize: 33,
    marginBottom: 8
  },
  categoryText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'HelveticaNeue-Thin',
  },
  timePicker: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    zIndex: 1,
    width: '100%',
    marginTop: 30
  }
});
