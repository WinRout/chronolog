import { StyleSheet, Text, View, FlatList } from 'react-native'
import { useState } from 'react'
import React from 'react'

import { Typo, Colors, Screens, Boxes } from '../styles'

import CurrentDate from "../components/atoms/CurrentDate"
import AccountItem from '../components/molecules/AccountItem'

const Account = () => {
    const [isEnabledStart, setIsEnabledStart] = useState(false);
    const [isEnabledStop, setIsEnabledStop] = useState(false);
    const ToggleSwitchStart = () => setIsEnabledStart(previousState => !previousState);
    const ToggleSwitchStop = () => setIsEnabledStop(previousState => !previousState);

    const data = [
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
        <View style={Screens.primary}>
            <CurrentDate></CurrentDate>
            <Text style={Boxes.primary_title}>Push Notifications</Text>
            <View style={Boxes.primary}>
                <FlatList 
                    data={[
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
                        }
                    ]}
                    renderItem={({item}) => 
                    <AccountItem 
                        title={item.title} 
                        description={item.description}
                        icon={item.icon}
                        color={item.color}
                        isEnabled={item.isEnabled}
                        toggleSwitch={item.toggleSwitch}
                    />
                }
                />
            </View>
        </View>
    )
}

export default Account

const styles = StyleSheet.create({
})