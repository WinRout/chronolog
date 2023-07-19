import { Text, TouchableOpacity } from 'react-native'
import React from 'react'

import { Buttons } from "../../styles"

const Button = ({text="Button", onPress=null, disabled=false, style=Buttons.primary, textStyle = Buttons.primary_text}) => {
  return (
      <TouchableOpacity onPress={onPress} style={disabled ? {...style, ...Buttons.disabled} : style} disabled={disabled}>
        <Text style={textStyle}>{text}</Text>
      </TouchableOpacity>
  )
}

export default Button