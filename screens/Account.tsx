import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { Typo, Colors, Screens } from '../styles'

import CurrentDate from "../components/atoms/CurrentDate"

const Account = () => {
    return (
        <View style={[Screens.primary, styles.container]}>
            <CurrentDate></CurrentDate>
        </View>
    )
}

export default Account

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    smallText: {
        color: "black"
    }
})