import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function CurrentDate() {
    const currentDate = new Date();
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    const formattedDate = currentDate.toLocaleDateString('en-US', options);
    const [weekday, month] = formattedDate.split(',');
  return (
    <View>
      <Text style={styles.date_text}>{weekday},{'\n'}{month}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  date_text: {
    color: "#452135",
    fontSize: 19,
    fontWeight: "bold",
    padding: 20,
    marginLeft: 40
  },
});