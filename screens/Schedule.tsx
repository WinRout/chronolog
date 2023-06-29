import { StyleSheet, Text, View, StatusBar } from 'react-native'
import React from 'react'

import CurrentDate from "../components/CurrentDate"

const Schedule = () => {
  return (
    <View>
      <StatusBar barStyle="light-content" backgroundColor="#ecf0f1" />
      <CurrentDate></CurrentDate>
    </View>
  )
}

export default Schedule
