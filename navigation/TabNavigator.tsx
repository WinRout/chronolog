import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import TabBarIcon from "../components/atoms/TabBarIcon"
import { Header, Navigator } from "../styles"

// Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Screens
import ScheduleScreen from '../screens/Schedule';
import AccountScreen from '../screens/Account';
import YourHoursScreen from '../screens/YourHours';
import CheckInScreen from '../screens/CheckIn';
import { Screen } from 'react-native-screens';

export type RootStackParamList = {
    Schedule: undefined;
    CheckIn: undefined;
    YourHours: undefined;
    Account: undefined;
}

const Tab = createBottomTabNavigator < RootStackParamList > ()

export default function TabNavigator() {
  return (
      <NavigationContainer>
          <Tab.Navigator initialRouteName='Schedule'
          screenOptions={{
            tabBarStyle: Navigator.navigator,
            tabBarItemStyle: Navigator.item,
            tabBarLabelStyle: Navigator.label,
            headerStyle: Header.header,
            headerTitleStyle: Header.header_text_dark,
            headerShown: true,
          }}>
              {/* <Tab.Screen
                  name='Schedule'
                  component={ScheduleScreen}
                  options={{
                      title: "Schedule",
                      headerTitle: "🗓️ Schedule",
                      tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} icon="🗓️" />,
                  }}
              /> */}
              <Tab.Screen
                  name='CheckIn'
                  component={CheckInScreen}
                  options={{
                      title: "Check In",
                      headerTitle: "📍 Check In",
                      tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} icon="📍" />,
                  }}
              />
              <Tab.Screen
                  name='YourHours'
                  component={YourHoursScreen}
                  options={{
                      title: "Your Hours",
                      headerTitle: "⌛️ Your Hours",
                      tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} icon="⌛️" />,
                  }}
              />
              <Tab.Screen
                  name='Account'
                  component={AccountScreen}
                  options={{
                      title: "Account",
                      headerTitle: "👩🏻 Account",
                      tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} icon="👩🏻"/>,
                  }}
              />
          </Tab.Navigator>

      </NavigationContainer>
  )
}