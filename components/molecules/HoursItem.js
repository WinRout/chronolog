import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { Typo, Colors} from '../../styles'

import Timer from '../atoms/Timer'

const HoursItem = ({date, timeIn='', timeOut='', address='', time}) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title_text}>{date}</Text>
      <Text style={styles.info_text}>{timeIn} - {timeOut}</Text>
      <Text style={styles.info_text}>{address}</Text>
      <Timer text={time}></Timer>
    </View>
  )
}

export default HoursItem

const styles = StyleSheet.create({
  title_text : {
    ...Typo.headingBold, 
    color: Colors.textPrimary, 
    paddingLeft: 20
  },
  info_text: {
    ...Typo.textPrimary, 
    color: Colors.textPrimary, 
    paddingLeft: 20, 
    marginTop: 10
  },
  wrapper: {
    paddingTop: 20,
    borderBottomWidth: 1,
    borderColor: Colors.borderSecondary,
  }
})