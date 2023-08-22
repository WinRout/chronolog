/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import { SafeAreaView, Button } from 'react-native';
import TabNavigator from './navigation/TabNavigator';

import { TablesDB } from './database';

export default function App() {

  useEffect(() => {   
    //We make sure that the table of the database exists, and if not we create it 
    TablesDB.default();
  }, [])
  return (
    <SafeAreaView style={{flex:1}}>
      <TabNavigator></TabNavigator>
    </SafeAreaView>
  );
}