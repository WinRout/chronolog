import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import {Screens} from "../styles"

//Components
import CurrentDate from "../components/atoms/CurrentDate"

const YourHours = () => {
    return (
        <View style={Screens.primary}>
            <CurrentDate></CurrentDate>
        </View>
    )
}
export default YourHours