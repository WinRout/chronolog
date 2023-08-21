import { StyleSheet, View, ScrollView } from 'react-native'
import React from 'react'

import { Colors, Screens } from "../styles"

// Components
import CurrentDate from "../components/atoms/CurrentDate";
import StopwatchTimer from '../components/molecules/StopwatchTimer';

const CheckIn = () => {
    return (
        <ScrollView style={{backgroundColor: Colors.surfacePrimary}}>
            <View style={Screens.checkin}>
                <CurrentDate></CurrentDate>
                <StopwatchTimer></StopwatchTimer>
            </View>
        </ScrollView>
    )
}

export default CheckIn;

const styles=StyleSheet.create({
})