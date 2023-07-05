import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'

import { Typo, Colors, Screens, Boxes } from '../styles'

import CurrentDate from "../components/atoms/CurrentDate"
import AccountItem from '../components/molecules/NotificationSetting'
import AccountInformation from '../components/organisms/AccountInformation'
import AccountNotifications from '../components/organisms/AccountNotifications'

const Account = () => {    
    return (
        <ScrollView style={Screens.primary}>
            <View style={Screens.primary}>
                <CurrentDate></CurrentDate>
                <AccountNotifications></AccountNotifications>
                <AccountInformation></AccountInformation>
            </View>
        </ScrollView>
    )
}

export default Account

const styles = StyleSheet.create({
})