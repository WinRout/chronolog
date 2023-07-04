import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { Typo, Colors} from '../../styles'

import Timer from '../atoms/Timer'

const HoursItem = ({date, time}) => {
  return (
    <View style={styles.wrapper}>
      <Text style={{...Typo.headingBold, color:Colors.textPrimary, paddingLeft: 20}}>{date}</Text>
      <Timer text={time}></Timer>
    </View>
  )
}

export default HoursItem

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 20,
    borderTopWidth: 1,
    borderColor: Colors.borderSecondary,
  }
})