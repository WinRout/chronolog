import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { Typo, Colors } from "../../styles"

export default function Timer({text, small=false}) {
    
    
    if (!small) return (
        <View style={styles.timer_box}>
            <Text style={styles.timer_text}>{text}</Text>
        </View>
    )
    else return <Text style={styles.timer_text_small}>{text}</Text>
}

const styles = StyleSheet.create({
    timer_text: {
        ...Typo.headingLargeBold,
        color: Colors.textPrimary,
    },
    timer_text_small: {
        ...Typo.headingLargeBold,
        color: Colors.textPrimary,
        fontSize: 40
    },
    timer_box: {
        alignContent: 'center',
        alignItems: 'center',
        paddingBottom: 10
    }
});