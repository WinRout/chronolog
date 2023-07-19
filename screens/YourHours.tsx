import { getISOWeek } from "date-fns";
import { StyleSheet, View, ScrollView } from 'react-native'
import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useRoute } from '@react-navigation/native';

import {Screens} from "../styles"

//Components
import HoursHistory from '../components/organisms/HoursHistory'

const Stack = createNativeStackNavigator();

const MainScreen = () => {
    const currentDate = new Date();
    const currentWeekNo = getISOWeek(currentDate);
    return (
        <ScrollView style={Screens.primary}>
            <View style={Screens.primary}>
                <HoursHistory weekNo={currentWeekNo} fullTotal={true}></HoursHistory>
            </View>
        </ScrollView>
    )
}

const WeekScreen = () => {

    const route = useRoute();
    const {weekNo} = route.params;

    return (
        <ScrollView style={Screens.primary}>
            <View style={Screens.primary}>
                <HoursHistory weekNo={weekNo} fullTotal={false}></HoursHistory>
            </View>
        </ScrollView>
    )
}

const YourHours = () => {
    return (
    <Stack.Navigator initialRouteName="Full Total"
    screenOptions={{
        headerShown: true,
        headerBackTitleVisible: false,
    }}>
        <Stack.Screen
            name="Full Total"
            component={MainScreen}
            options={{
                headerShown: false
            }}
        />
        <Stack.Screen
            name="Week Total" 
            component={WeekScreen}
            options={({ route }) => ({
                title: 'Week #' + route.params.weekNo.toString()
            })}
        />
    </Stack.Navigator>
)}
export default YourHours

const styles = StyleSheet.create({
   
})