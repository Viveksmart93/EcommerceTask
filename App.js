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
  AsyncStorage
} from 'react-native';
import { createSwitchNavigator, createDrawerNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import { Icon } from 'react-native-elements';


import Login from './src/Login';
import Home from './src/Home';
import Checkout from './src/Checkout';
import History from './src/History';

const AuthStack = new createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: ({ navigation }) => ({
      title: 'Sign In',
    })
  }
});


console.disableYellowBox = true;

const HomeStack = new createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: ({ navigation }) => ({
        title: 'Store',
        headerMode: 'screen',
        headerLeft: <Icon iconStyle={{ padding: 10 }} name="menu" onPress={() => navigation.toggleDrawer()} />,
        headerRight: <Icon iconStyle={{ padding: 10 }} name="md-cart" type="ionicon" onPress={() => navigation.navigate('Checkout')} />
      })
    }
  }
)

const CheckoutStack = new createStackNavigator(
  {
    Checkout: {
      screen: Checkout,
      navigationOptions: ({ navigation }) => ({
        title: 'Checkout',
        headerLeft: <Icon iconStyle={{ padding: 10 }} name="menu" onPress={() => navigation.toggleDrawer()} />,
      })
    }
  }
)

const HistoryStack = new createStackNavigator(
  {
    History: {
      screen: History,
      navigationOptions: ({ navigation }) => ({
        title: 'History',
        headerLeft: <Icon iconStyle={{ padding: 10 }} name="menu" onPress={() => navigation.toggleDrawer()} />,
      })
    }
  }
)

const AppStack = new createDrawerNavigator(
  {
    Home: HomeStack,
    Checkout: CheckoutStack,
    History: HistoryStack,
    Logout: {
      screen: ({ navigation }) => {
        setTimeout(async () => {
          await AsyncStorage.removeItem("isLogin").then(() => {
            console.log('remove item', 'logoutsuccess')
          })
          navigation.navigate('Auth');
        },100);
        return null;
      }
    }
  }
)

const AppSwitch = new createSwitchNavigator({
  Auth: AuthStack,
  App: AppStack
});

export default createAppContainer(AppSwitch);
