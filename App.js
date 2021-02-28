import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import Home from './src/screens/HomeScreen';
import ClassInfoInput from './src/screens/ClassInfoInputScreen';
import Results from './src/screens/ResultsScreen';

import ClassTimer from './src/screens/ClassTimerScreen';
import EditAnalysis from './src/screens/EditAnalysisScreen';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';


const appNavigator = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        headerShown: false
      }
    },
    ClassInfoInput: {
      screen: ClassInfoInput,
      navigationOptions: {
        headerShown: false
      }
    },
    EditAnalysis: {
      screen: EditAnalysis,
      navigationOptions: {
        headerShown: false
      }
    },
    Results: {
      screen: Results,
      navigationOptions: {
        headerShown: false
      }
    },

    ClassTimer: {
      screen: ClassTimer,
      navigationOptions: {
        headerShown: false
      }
    }
    
    
  },
  {
    initialRouteName: 'Home',
  }
);


const styles = StyleSheet.create({});

export default createAppContainer(appNavigator);

// export default createAppContainer(navigator);