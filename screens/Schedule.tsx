import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'

import { Typo, Colors, Screens } from "../styles"

import CurrentDate from "../components/atoms/CurrentDate"
import welcomeMessage from '../functionality/welcomeMessage'
import Weather from '../components/atoms/Weather'
import Timer from '../components/atoms/Timer'

const Schedule = () => {
  return (
    <ScrollView style={Screens.primary}>
      <CurrentDate></CurrentDate>
      <View style={styles.welcome_box}>
        <View style={styles.weather_box}>
          <Weather></Weather>
        </View>
        <Text style={styles.welcome_text}>👋{'\n'}{welcomeMessage()}!</Text>
      </View>
      <View style={{...styles.welcome_box, marginTop:40}}>
        <Text style={styles.welcome_text}>Here's your working schedule for today.</Text>
      </View>
      <View style={styles.schedule_box}>
        <Text style={{...Typo.textXSmall}}>📍WORK LOCATION:</Text>
        <Text style={{...Typo.headingBold, marginTop:10}}>Home office</Text>
        <Text style={{ ...Typo.textLight, marginTop: 10 }}>
          You can work anywhere as long as your internet speed is fast enough to attend your meetings and upload your work.
        </Text>
        <Text style={{...Typo.textXSmall, marginTop:20}}>⏰ WORKing hours:</Text>
        <Text style={styles.schedule_time}>
          12:00-17:00
        </Text>
      </View>
    </ScrollView>
  )
}

export default Schedule

const styles = StyleSheet.create({
  welcome_text: {
    ...Typo.textMedium,
    alignSelf: 'flex-start'
  },
  welcome_box: {
    marginTop: 0,
    alignSelf: 'center',
    alignItems: 'center',
    width:250,
    gap: -40,
    marginTop: -40
  },
  weather_box: {
    alignSelf: 'flex-end'
  },
  schedule_box: {
    marginTop: 20,
    width: 270,
    alignSelf: 'center',
    borderStyle: 'solid',
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: Colors.mantarini,
    padding:20,
    marginBottom: 20
  },
  schedule_time: {
    ...Typo.headingLargeBold,
    color: Colors.dark
  }

})
