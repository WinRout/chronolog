import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { Boxes, Typo } from '../../styles'

import HoursItem from '../molecules/HoursItem'

const HoursHistory = () => {

    const data = [
        {
            date: 'Sunday, 3 September',
            time: '05:00:31'
        },
        {
            date: 'Monday, 4 September',
            time: '05:10:01'
        }
    ]

  return (
    <View style={Boxes.primary}>
        <Text style={{ ...Typo.textXSmall, marginLeft: 10, marginTop: 25 }}>WEEK #25:</Text>
        {data.map( ({date, time}) =>
            <HoursItem date={date} time={time}></HoursItem>
        )}
    </View>
  )
}

export default HoursHistory

const styles = StyleSheet.create({})