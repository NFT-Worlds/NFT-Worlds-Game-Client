import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import * as Font from 'expo-font';
import { BackgroundVideo } from './components';

import { LoginScreen, HomeScreen } from './screens';

export default class Main extends Component {
  componentDidMount() {
    Font.loadAsync({
      Regular: require('./assets/fonts/Montserrat-Medium.ttf').default,
      RegularItalic: require('./assets/fonts/Montserrat-MediumItalic.ttf').default,
      Bold: require('./assets/fonts/Montserrat-Bold.ttf').default,
      BoldItalic: require('./assets/fonts/Montserrat-BoldItalic.ttf').default,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <HomeScreen />

        <BackgroundVideo />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    height: '100%',
  },
  logoImage: {
    width: 300,
    height: 44,
    marginTop: 50,
  },
});
