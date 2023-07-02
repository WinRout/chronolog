import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { Typo } from "../../styles"

export default function CurrentDate() {
    const currentDate = new Date();
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    const formattedDate = currentDate.toLocaleDateString('en-US', options);
    const [weekday, month] = formattedDate.split(',');
  return (
    <Text style={styles.date_text}>{weekday},{'\n'}{month}</Text>
  )
}

const styles = StyleSheet.create({
  date_text: {
    ...Typo.headingBold,
    padding: 20,
    marginLeft: 40
  },
});