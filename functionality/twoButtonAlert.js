import React from 'react'
import { Alert } from 'react-native'

export default function twoButtonAlert({title, message, button1_text, button1_onPress, button2_text, button2_onPress}) {
  return (
    Alert.alert(title, message, [
      {
        text: button1_text,
        onPress: button1_onPress
      },
      {
        text: button2_text,
        onPress: button2_onPress
      }
    ])
  )
}
