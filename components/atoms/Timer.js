import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { Typo, Colors } from "../../styles"

export default function Timer({text}) {
    
    return (
        <View style={styles.timer_box}>
            <Text style={styles.timer_text}>{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    timer_text: {
        ...Typo.headingLargeBold,
        color: Colors.dark,
    },
    timer_box: {
        alignContent: 'center',
        alignItems: 'center',
        padding: 10
    }
});