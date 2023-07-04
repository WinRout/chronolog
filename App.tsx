/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { SafeAreaView } from 'react-native';

import TabNavigator from './navigation/TabNavigator';


export default function App() {
  return (
    <SafeAreaView style={{flex:1}}>
      <TabNavigator></TabNavigator>
    </SafeAreaView>
  );
}