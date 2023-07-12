import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { Typo, Colors } from '../../styles'

import Timer from '../atoms/Timer'

const TotalTime = ({time}) => {
  return (
    <View style={styles.wrapper}>
        <Text style={styles.text}>
            Here is a summary of the hours you worked and which day.
        </Text>
        <View style={styles.wrapper_total_time}>
            <Text style={{...Typo.textXSmall, color:Colors.textPrimary}}>IN TOTAL</Text>
            <Timer text={time}></Timer>
        </View>
      </View>
  )
}

export default TotalTime

const styles = StyleSheet.create({
    wrapper: {
        alignItems: 'center',
        width: '100%',
        alignSelf: 'center',
        gap: 0,
        marginTop: 30,

    },
    wrapper_total_time: {
        paddingTop: 20,
        alignItems: 'center',
        gap: -10,
        borderColor: Colors.borderSecondary,
        borderTopWidth: 1,
        borderBottomWidth: 1,
    },
    text: {
        ...Typo.textMedium,
        color: Colors.textPrimary,
        textAlign: 'center',
        width: '85%',
    }
})