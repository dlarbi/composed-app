import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button
} from 'react-native';

class ProfileScreen extends React.Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <Text>
              User Profile
            </Text>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
};

const styles = StyleSheet.create({
  scrollView: {
    height: '100%'
  },
  homeScreen: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 32
  }
});

export default ProfileScreen;
