import React from 'react';
import { Animated, Image, Text, View, StyleSheet, ActivityIndicator } from 'react-native';

class ImageLoader extends React.Component {
  state = {
    opacity: new Animated.Value(0),
  }

  onLoad = () => {
    this.props.handleFinishLoading();
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start()
  }

  render() {
    return (
      <Animated.Image
        onLoad={this.onLoad}
        {...this.props}
        style={[
          {
            opacity: this.state.opacity,
            transform: []
          },
          this.props.style
        ]}
      />
    )
  }
}

class LazyImage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }

  loadingComplete = () => {
    this.setState({
      loading: false
    });
  }

  render() {
    return (
      <View style={{width:'100%', height:'100%'}}>
        {this.state.loading &&
          <ActivityIndicator size='large' style={this.props.loadingStyle} />
        }
        <ImageLoader source={this.props.source} style={[this.props.style]} handleFinishLoading={this.loadingComplete}/>
      </View>
    )
  }
}

export default LazyImage;
