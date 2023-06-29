import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

const Button = ({text="Button", onPress}) => {
  return (
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <Text style={styles.button_text}>{text}</Text>
      </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({
    button: { 
        width: 188, 
        height: 70, 
        position: 'relative', 
        backgroundColor: '#008080', 
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: "center"
    },
    button_text: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold"
    } 
})