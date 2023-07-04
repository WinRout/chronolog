import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { Typo, Colors } from "../../styles"

export default function CurrentDate() {
    const currentDate = new Date();
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    const formattedDate = currentDate.toLocaleDateString('en-US', options);
    const [weekday, month_day_no] = formattedDate.split(', ');
    const [month, day_no] = month_day_no.split(' ');
  return (
    <Text style={styles.date_text}>{weekday},{'\n'}{day_no} {month}</Text>
  )
}

const styles = StyleSheet.create({
  date_text: {
    ...Typo.headingBold,
    padding: 20,
    marginLeft: 40,
    color: Colors.dark
  },
});