import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

// Icons
import SvgUri from 'react-native-svg-uri';

const TabBarIcon = ({ focused, icon }) => {
    return (
        <View style={styles.tabIconContainer}>
            <View style={[styles.tab_circle, focused && styles.tab_activeCircle]}>
                <Text style={styles.tab_icon}>{icon}</Text>
            </View>
        </View>
    );
};

// Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Screens
import ScheduleScreen from '../screens/Schedule';
import AccountScreen from '../screens/Account';
import YourHoursScreen from '../screens/YourHours';
import CheckInScreen from '../screens/CheckIn';

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
            tabBarStyle: styles.tab_navigator,
            tabBarItemStyle: styles.tab_item,
            tabBarLabelStyle: styles.tab_label,
            headerStyle: styles.header,
            headerTintColor: 'white',
          }}>
              <Tab.Screen
                  name='Schedule'
                  component={ScheduleScreen}
                  options={{
                      title: "Schedule",
                      tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} icon="🗓️" />,
                  }}
              />
              <Tab.Screen
                  name='CheckIn'
                  component={CheckInScreen}
                  options={{
                      title: "Check In",
                      tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} icon="📍" />,
                  }}
              />
              <Tab.Screen
                  name='YourHours'
                  component={YourHoursScreen}
                  options={{
                      title: "Your Hours",
                      tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} icon="⌛️" />,
                  }}
              />
              <Tab.Screen
                  name='Account'
                  component={AccountScreen}
                  options={{
                      title: "Account",
                      tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} icon="👩🏻"/>,
                  }}
              />
          </Tab.Navigator>
      </NavigationContainer>
  )
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#24121C'
    },
    tab_navigator: {
        backgroundColor: 'white',
        height: 90,
        paddingTop: 10
    },
    tab_item: {
        borderRightStyle: 'solid',
        borderRightWidth: 0.2,
        borderColor: 'gray'
    },
    tab_label: {
        color:"black",
        textTransform: "uppercase",
        fontSize: 10,
    },
    tab_icon: {
        fontSize: 20,
    },
    tabIconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    tab_circle: {
        width: 40,
        height: 40,
        borderRadius: 25,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: 'white',
    },
    tab_activeCircle: {
        backgroundColor: 'yellow',
    },
});