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
import ToolsSelector from '../../../selectors/tools';

class ToolCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.imageBg = Utils.getRandomCardBgImage();
  }
  render() {
    const { tool, onPress, handleToggleToolToUsersToolbox } = this.props;
    const isInToolbox = ToolsSelector.selectIsInUserToolbox(tool.id);
    return (
      <TouchableOpacity style={styles.toolCard}>
        <View style={styles.toolCardImageWrapper}>
          <Image source={this.state.imageBg} style={styles.toolCardImage}/>
        </View>
        <View style={styles.toolCardBody}>
          <Text style={styles.header}>
            {tool.name}
          </Text>
          <Text style={styles.text}>
            {tool.content && tool.content.text}
          </Text>
        </View>
        <View style={styles.toolCardFooter}>
          <TouchableOpacity
            style={isInToolbox ? styles.removeFromToolboxButton : styles.addToToolboxButton}
            onPress={() => handleToggleToolToUsersToolbox(tool.id)}
          >
            <Text style={styles.addToToolboxButtonText}>{isInToolbox ? 'Remove' : 'Add'}</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  toolCard: {
    width: '90%',
    backgroundColor: '#ffffff',
    marginTop: 15,
    marginBottom: 30,
    borderRadius: 8
  },
  toolCardImageWrapper: {
    width: '100%',
    height: 50
  },
  toolCardImage: {
    width: '100%',
    height: '100%',
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8
  },
  toolCardBody: {
    padding: 10,
  },
  toolCardFooter: {
    padding: 10,
    alignItems: 'flex-end'
  },
  header: {
    fontSize: 18,
    marginBottom: 10,
    fontFamily: 'HelveticaNeue-Bold'
  },
  text: {
    fontSize: 14,
    fontFamily: 'HelveticaNeue-Thin'
  },
  addToToolboxButton: {
    backgroundColor: '#68c3b6',
    padding: 7,
    borderRadius: 4
  },
  removeFromToolboxButton: {
    backgroundColor: '#f00',
    padding: 7,
    borderRadius: 4
  },
  addToToolboxButtonText: {
    color: "#FFFFFF"
  }
});

export default ToolCard;
