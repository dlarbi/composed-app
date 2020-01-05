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
  ActivityIndicator,
  Image
} from 'react-native';
import { SCREEN_NAMES, BACKGROUND_IMAGES, ICONS } from '../constants/constants';
import ToolCard from './components/tool/tool-card';
import ToolsService from '../services/tools-service';
import UsersService from '../services/users-service';
import selfStore from '../stores/self';
import toolsStore from '../stores/tools';
import Intro from '../components/intro/intro';

class ToolsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tools: [],
      user: {
        toolIds: []
      }
    };
    this.willFocusSubscription = this.props.navigation.addListener(
      'willFocus',
      payload => {
        this.loadData();
      }
    );
  };

  loadData = async () => {
    this.setState({
      loading: true
    });
    await ToolsService.fetchTools();
    const user = selfStore.getUser();
    const tools = toolsStore.getTools();
    this.setState(previousState => ({
      tools,
      user,
      loading: false
    }));
  }

  componentDidMount = async () => {
    await this.loadData();
  };

  componentWillUnmount() {
    this.willFocusSubscription.remove();
  }

  handleToggleToolToUsersToolbox = async (toolId) => {
    try {
      await UsersService.toggleToolIdToLoggedInUser(toolId);
    } catch (err) {
      console.log(err)
      console.log('Show an error in the UI');
    }
    const user = selfStore.getUser();
    this.setState({
      user
    });
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <>
        <Intro handleToggleToolToUsersToolbox={this.handleToggleToolToUsersToolbox}/>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>

          <ImageBackground source={BACKGROUND_IMAGES.DARK_WOOD} style={styles.bgImage}>
            {this.state.loading &&
              <ActivityIndicator size="large" color="#CCCCCC" style={styles.loading}/>
            }
            <ScrollView
              contentInsetAdjustmentBehavior="automatic"
              style={styles.scrollView}>
                <TouchableOpacity onPress={UsersService.logout}>
                <Text>Logout</Text>
                </TouchableOpacity>
                <View style={styles.toolContainer}>
                  <TouchableOpacity style={styles.yourToolboxButton} onPress={() => { navigate(SCREEN_NAMES.TOOLBOX); }}>
                    <View style={styles.yourToolboxButtonHeader}>
                      <Image source={ICONS.TOOLBOX_TAB_ICON} style={styles.yourToolboxButtonIcon} />
                      <Text style={styles.yourStressToolboxButtonTitle}>Your Relaxation Toolbox</Text>
                    </View>

                    <View style={styles.yourToolBoxButtonStats}>
                      <View style={styles.yourToolBoxButtonStat}>
                        <Text><Text style={styles.toolCount}>{this.state.user.toolIds && this.state.user.toolIds.length}</Text> tools</Text>
                      </View>
                      <View style={styles.yourToolBoxButtonStat}>
                        <Text style={styles.completedStat}><Text style={styles.toolCount}>3</Text> moments taken today</Text>
                      </View>
                    </View>

                    <View style={styles.yourToolBoxButtonExplore}>
                      <Text style={styles.yourToolBoxButtonExploreText}>Look Inside {'>'}</Text>
                    </View>
                  </TouchableOpacity>

                  <Text style={styles.toolsListHeading}>
                    Discover new tools to ease stress and foster joy 🧘 😌
                  </Text>

                  {
                    this.state.tools.map((tool, i) => {
                      return (
                        <ToolCard
                          tool={tool}
                          handleToggleToolToUsersToolbox={this.handleToggleToolToUsersToolbox}
                        />
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
  yourToolboxButton: {
    backgroundColor: '#fff',
    padding: 10,
    marginTop: 15,
    marginBottom: 55,
    borderRadius: 8,
    width: '90%',
    flexDirection: 'column',
    paddingBottom: 15
  },
  yourToolboxButtonHeader: { flexDirection:'row' },
  yourToolBoxButtonStats: {
    width: '100%',
    justifyContent: 'space-around',
  },
  yourToolboxButtonIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain'
  },
  yourStressToolboxButtonTitle: {
    fontSize: 20,
    marginLeft: 10,
    marginTop: 5,
    fontFamily: 'HelveticaNeue'
  },
  toolContainer: {
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
  },
  toolsListHeading: {
    fontFamily: 'HelveticaNeue-Thin',
    color: '#FFFFFF',
    fontSize: 28,
    width: '90%'
  },
  yourToolBoxButtonStat: {
    marginTop: 12
  },
  completedStat: {
    color: '#0fb80f'
  },
  toolCount: {
    fontWeight: '800',
    fontSize: 20
  },
  yourToolBoxButtonExplore: {
    position: 'absolute',
    right: 15,
    bottom: 15,
  },
  yourToolBoxButtonExploreText: {
    fontSize: 18,
    fontFamily: 'HelveticaNeue-Bold',
    color: '#68c3b6'
  }
});

export default ToolsContainer;
