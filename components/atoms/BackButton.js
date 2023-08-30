import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

import { Typo, Colors } from '../../styles'

const BackButton = ({onPress=null, text='back'}) => {
  return (
      <TouchableOpacity style={styles.back_button} onPress={onPress}>
          <Text style={styles.back_button_text}>{`❮ ${text}`}</Text>
          <View style={styles.underline}></View>
      </TouchableOpacity>
  )
}

export default BackButton

const styles = StyleSheet.create({
    back_button: {
        marginHorizontal: 30,
        marginTop: 10,
        gap: 15,
    },
    back_button_text: {
        ...Typo.textMedium,
        color: Colors.textPrimary
    },
    underline: {
        borderWidth: 0.5,
        borderColor: Colors.textPrimary,
        borderStyle: 'solid',
        width: 90,
        marginTop: -10
    }
})