import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { Typo, Colors } from "../../styles"

export default function CurrentDate({time}) {
    const formatTime = (milliseconds) => {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        const formattedHours = String(hours).padStart(2, '0');
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(seconds).padStart(2, '0');

        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    };
    return (
        <View style={styles.timer_box}>
            <Text style={styles.timer_text}>{formatTime(time)}</Text>
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