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
import { BACKGROUND_IMAGES } from '../constants/constants';
import selfStore from '../stores/self';
import ToolsService from '../services/tools-service';
import UsersService from '../services/users-service';

import ToolsSelector from '../selectors/tools';
import ToolCard from './components/tool/tool-card';

class ToolboxContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tools: []
    };
  };

  componentDidMount = async () => {
    this.setState({
      loading: true
    });
    const user = await selfStore.getUser();
    await ToolsService.fetchToolsByUserId(user.id);
    this.setState(previousState => ({
      tools: ToolsSelector.selectLoggedInUserToolbox(),
      loading: false
    }));
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
            <View style={styles.toolContainer}>

              <Text style={styles.toolsListHeading}>
                Your Relaxation Toolbox
              </Text>

              {!this.state.tools.length &&
                <Text style={styles.emptyMessage}>Your toolbox is empty...</Text>
              }

              {
                this.state.tools.map((tool, i) => {
                  return (
                    <ToolCard
                      tool={tool}
                      handleToggleToolToUsersToolbox={() => {this.handleToggleToolToUsersToolbox(tool.id)}}
                    />
                  );
                })
              }
            </View>
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
  loading: {
    zIndex: 100,
    marginTop: '65%'
  },
  toolContainer: {
    flex: 1,
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    paddingTop: '5%'
  },
  toolsListHeading: {
    fontFamily: 'HelveticaNeue-Thin',
    color: '#FFFFFF',
    fontSize: 28,
    width: '90%'
  },
  emptyMessage: {
    fontFamily: 'HelveticaNeue-Thin',
    color: '#FFFFFF',
    fontSize: 18,
    width: '90%',
    marginTop: 25
  }
});

export default ToolboxContainer;
