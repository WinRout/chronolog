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
            headerTitleStyle: styles.header_title
          }}>
              <Tab.Screen
                  name='Schedule'
                  component={ScheduleScreen}
                  options={{
                      title: "Schedule",
                      headerTitle: "🗓️ Schedule",
                      tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} icon="🗓️" />,
                  }}
              />
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

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#24121C'
    },
    header_title: {
        fontSize: 18,
        color: "white",
        textTransform: "uppercase",
        fontWeight: 800,
    },
    tab_navigator: {
        backgroundColor: 'white',
        paddingTop: 10,
    },
    tab_item: {
        borderRightStyle: 'solid',
        borderRightWidth: 0.2,
        borderColor: 'gray'
    },
    tab_label: {
        color:"black",
        textTransform: "uppercase",
        fontSize: 8,
        marginTop: 5
    },
    tab_icon: {
        fontSize: 15,
    },
    tabIconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    tab_circle: {
        width: 30,
        height: 30,
        borderRadius: 25,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0.2,
        borderColor: 'gray',
    },
    tab_activeCircle: {
        backgroundColor: 'yellow',
    },
});