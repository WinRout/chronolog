import { Text, TouchableOpacity } from 'react-native'
import React from 'react'

import { Buttons } from "../../styles"

const Button = ({text="Button", onPress=null}) => {
  return (
      <TouchableOpacity onPress={onPress} style={Buttons.primary}>
        <Text style={Buttons.primary_text}>{text}</Text>
      </TouchableOpacity>
  )
}

export default Button