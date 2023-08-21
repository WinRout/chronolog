import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { Typo, Colors } from "../../styles"

import { dateToJson } from '../../functionality/mainFunctions';

export default function CurrentDate() {
    const currentDate = new Date();
    const dateJson = dateToJson(currentDate)
  return (
    <Text style={styles.date_text}>{dateJson.weekday},{'\n'}{dateJson.day_no} {dateJson.month}</Text>
  )
}

const styles = StyleSheet.create({
  date_text: {
    ...Typo.headingBold,
    padding: 20,
    marginLeft: 30,
    color: Colors.textPrimary
  },
});