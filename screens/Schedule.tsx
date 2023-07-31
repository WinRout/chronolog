import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'

import { Typo, Colors, Screens } from "../styles"

import CurrentDate from "../components/atoms/CurrentDate"
import welcomeMessage from '../functionality/welcomeMessage'
import Weather from '../components/atoms/Weather'

const Schedule = () => {
  return (
      <ScrollView style={Screens.primary}>
        <View style={Screens.primary}>
        <CurrentDate></CurrentDate>
        <View style={styles.welcome_box}>
          <View style={styles.weather_box}>
            <Weather></Weather>
          </View>
          <Text style={styles.welcome_text}>👋{'\n'}{welcomeMessage()}!</Text>
        </View>
        <View style={{ ...styles.welcome_box, marginTop: 40 }}>
          <Text style={styles.welcome_text}>Here's your working schedule for today.</Text>
        </View>
        <View style={styles.schedule_box}>
          <Text style={{ ...Typo.textXSmall, color: Colors.textPrimary }}>📍WORK LOCATION:</Text>
          <Text style={{ ...Typo.headingBold, marginTop: 10, color: Colors.textPrimary }}>Home office</Text>
          <Text style={{ ...Typo.textLight, marginTop: 10, color: Colors.textPrimary }}>
            You can work anywhere as long as your internet speed is fast enough to attend your meetings and upload your work.
          </Text>
          <Text style={{ ...Typo.textXSmall, marginTop: 20, color: Colors.textPrimary }}>⏰ WORKing hours:</Text>
          <Text style={styles.schedule_time}>
            12:00-{'\n'}17:00
          </Text>
        </View>
        </View>
      </ScrollView>
  )
}

export default Schedule

const styles = StyleSheet.create({
  schedule_box: {
    marginTop: 20,
    width: 290,
    alignSelf: 'center',
    borderStyle: 'solid',
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: 'lightgray',
    padding:20,
    marginBottom: 20
  },
  schedule_time: {
    ...Typo.headingLargeBold,
    color: Colors.dark
  }

})
