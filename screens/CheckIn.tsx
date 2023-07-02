import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { Screens } from "../styles"

// Components
import CurrentDate from "../components/atoms/CurrentDate";
import Button from '../components/atoms/Button';
import StopwatchTimer from '../components/molecules/StopwatchTimer';

const CheckIn = () => {
    return (
        <View style={Screens.primary}>
            <CurrentDate></CurrentDate>
            <View style={[styles.justified_container]}>
                <Text style={styles.paragraph}>Start your working hours when you are ready. We will keep the time for you.</Text>
                <StopwatchTimer></StopwatchTimer>
            </View>
        </View>
    )
}

export default CheckIn;

const styles=StyleSheet.create({
    justified_container: {
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 100,
        gap: 40
    },
    paragraph: {
        width: 250,
        color: "#4D515D",
        textAlign: "center"
    }
})