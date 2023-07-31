import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import welcomeMessage from '../../functionality/welcomeMessage'
import Weather from '../atoms/Weather'
import { Typo, Colors } from '../../styles'

const Welcome = () => {
  return (
      <View style={styles.welcome_box}>
          <View style={styles.weather_box}>
              <Weather></Weather>
          </View>
          <Text style={styles.welcome_text}>👋{'\n'}{welcomeMessage()}!</Text>
      </View>
  )
}

export default Welcome

const styles = StyleSheet.create({
    welcome_text: {
        ...Typo.textMedium,
        alignSelf: 'flex-start',
        color: Colors.textPrimary
    },
    welcome_box: {
        marginTop: 0,
        alignSelf: 'center',
        alignItems: 'center',
        width: 250,
        gap: -40,
        marginTop: -40
    },
    weather_box: {
        alignSelf: 'flex-end'
    },
})