/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Fragment } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import { Icon } from 'react-native-elements';


import Login from './src/Login';
import Home from './src/Home';

const AuthStack = new createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: ({ navigation }) => ({
      title: 'Sign In',
    })
  }
});

const AppStack = new createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: ({ navigation }) => ({
        title: 'Store',
        headerRight: <Icon name="md-cart" type="ionicon" />
      })
    }
  }
)

const AppSwitch = new createSwitchNavigator({
  Auth: AuthStack,
  App: AppStack
});

export default createAppContainer(AppSwitch);
