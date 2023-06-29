import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

// Components
import CurrentDate from "../components/CurrentDate"
import Button from '../components/Button'
import StopwatchTimer from '../components/StopwatchTimer'

const CheckIn = () => {
    return (
        <View>
            <CurrentDate></CurrentDate>
            <View style={styles.justified_container}>
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