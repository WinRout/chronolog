import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { Typo, Colors } from '../../styles';

// elapsedTime in seconds (number)
const TotalTime = ({time}) => {

    function formatTime(seconds) {
        const days = Math.floor(seconds / 86400);
        seconds %= 86400;
        const hours = Math.floor(seconds / 3600);
        seconds %= 3600;
        const minutes = Math.floor(seconds / 60);

        let result = '';
        if (days > 0) {
            result += days + 'd ';
        }
        if (hours > 0) {
            result += hours + 'h ';
        }
        if (minutes > 0) {
            result += minutes + 'm';
        }
        if (result === '') {
            result = '0m';
        }

        return result.trim();
    }

    timeString = formatTime(time)

  return (
    <View style={styles.position}>
      <Text style={styles.text}>{timeString}</Text>
    </View>
  )
}

export default TotalTime

const styles = StyleSheet.create({
    text:{
        ...Typo.headingLargeBold,
        color: Colors.textPrimary
    },
    position: {
        alignContent: 'flex-start',
        paddingBottom: 10
    }
})