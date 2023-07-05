import { StyleSheet, Text, View } from 'react-native'
import { useState } from 'react'
import React from 'react'

import { Boxes } from '../../styles'

import NotificationSetting from '../molecules/NotificationSetting'

const AccountNotifications = () => {

    const [isEnabledStart, setIsEnabledStart] = useState(false);
    const [isEnabledStop, setIsEnabledStop] = useState(false);
    const ToggleSwitchStart = () => setIsEnabledStart(previousState => !previousState);
    const ToggleSwitchStop = () => setIsEnabledStop(previousState => !previousState);

    const notificationSettings = [
        {
            title: "Time to start",
            description: "Receive a notification when it is time to start.",
            icon: "☀",
            color: '#B203FC',
            isEnabled: isEnabledStart,
            toggleSwitch: ToggleSwitchStart
        },
        {
            title: "Time to stop",
            description: "Receive a notification when it is itme to stop",
            icon: '🌙',
            color: '#5F41FE',
            isEnabled: isEnabledStop,
            toggleSwitch: ToggleSwitchStop
        }]

  return (
    <View style={{marginBottom: 20}}>
        <Text style={Boxes.primary_title}>Push Notifications</Text>
        <View style={Boxes.primary}>
            {notificationSettings.map(({title, description, icon, color, isEnabled, toggleSwitch}) => (
                <NotificationSetting
                    title = {title}
                    description = {description}
                    color = {color}
                    icon = {icon}
                    isEnabled = {isEnabled}
                    toggleSwitch = {toggleSwitch}
                    />
            ))}
        </View>
    </View>
  )
}

export default AccountNotifications

const styles = StyleSheet.create({})