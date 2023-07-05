import { Text, TouchableOpacity } from 'react-native'
import React from 'react'

import { Buttons } from "../../styles"

const Button = ({text="Button", onPress=null, disabled=false}) => {
  return (
      <TouchableOpacity onPress={onPress} style={disabled ? Buttons.primary_disabled : Buttons.primary} disabled={disabled}>
        <Text style={Buttons.primary_text}>{text}</Text>
      </TouchableOpacity>
  )
}

export default Button