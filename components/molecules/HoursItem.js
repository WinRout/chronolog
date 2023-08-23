import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { Typo, Colors} from '../../styles'
import Timer from '../atoms/Timer'
import { formatTime } from '../../functionality/mainFunctions'

const HoursItem = ({dateIn, dateOut, locationIn, locationOut, elapsedTime}) => {

  const dateStringToHourString = (dateString) => {
    const hours = dateString.substring(11,13)
    const minutes = dateString.substring(14,16)
    return `${hours}:${minutes}`
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.time_position}>
        <Timer text={formatTime(elapsedTime)} small={true}></Timer>
      </View>
      <View style={styles.info_position}>
        <Text style={styles.info_text}>⏰ {dateStringToHourString(dateIn)}</Text>
        <Text style={styles.info_text}>📍 {locationIn}</Text>
      </View>
      <View style={styles.info_position}>
        <Text style={styles.info_text}>🏁 {dateStringToHourString(dateOut)}</Text>
        <Text style={styles.info_text}>📍 {locationOut}</Text>
      </View>
      {/* <Timer ></Timer> */}
    </View>
  )
}

export default HoursItem

const styles = StyleSheet.create({
  time_position : {
    marginTop: 20,
    marginBottom: 5
  },
  info_text: {
    ...Typo.textPrimary, 
    color: Colors.textPrimary, 
  },
  info_position: {
    marginVertical: 10,
    gap: 5
  },
  wrapper: {
    borderTopWidth: 1,
    borderColor: Colors.borderSecondary,
  }
})