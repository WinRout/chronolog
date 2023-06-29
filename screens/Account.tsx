import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import CurrentDate from "../components/CurrentDate"

const Account = () => {
    return (
        <View>
            <CurrentDate></CurrentDate>
        </View>
    )
}

export default Account

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    smallText: {
        color: "black"
    }
})