import { StyleSheet, View, ScrollView } from 'react-native'
import React from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage';

import twoButtonAlert from '../functionality/twoButtonAlert';

import { Screens } from '../styles'

import CurrentDate from "../components/atoms/CurrentDate"
import AccountInformation from '../components/organisms/AccountInformation'
import AccountNotifications from '../components/organisms/AccountNotifications'
import Button from '../components/atoms/Button'

import { generateRandomData } from '../testing/generateRandomData';



const Account = () => {  
    const resetHistory = () => {
        const clearData = async () => {
            try {
                console.log('clearing data');
                await AsyncStorage.setItem('hoursHistory', '{}');
            } catch (err) {
                console.log('could not reset history: ', err);
            }
        } 
        twoButtonAlert({
            title: 'Alert', 
            message: 'Are you sure you want to delete all your history data?', 
            button1_text: 'Yes', button1_onPress: clearData,
            button2_text: 'No', button2_onPress: null    
        })
    } 
    
    const resetTimer = () => {
        const clearTimer = async () => {
            try {
                console.log('resetting timer');
                await AsyncStorage.removeItem('stopwatchTimerState');
            } catch (err) {
                console.log('could not clear timer: ', err);
            }
        }
        twoButtonAlert({
            title: 'Alert',
            message: 'Are you sure you want to reset the timer?',
            button1_text: 'Yes', button1_onPress: clearTimer,
            button2_text: 'No', button2_onPress: null
        })
    }
    
    return (
        <ScrollView style={Screens.primary}>
            <View style={Screens.primary}>
                <CurrentDate></CurrentDate>
                <AccountNotifications></AccountNotifications>
                <AccountInformation></AccountInformation>
                <View style={styles.buttonsView}>
                    <Button text={'Reset Timer'} onPress={resetTimer}></Button>
                    <Button text={'Clear History'} onPress={resetHistory}></Button>    
                    <Button text={'Testing'} onPress={generateRandomData}></Button>  
                </View>
            </View>
        </ScrollView>
    )
}

export default Account

const styles = StyleSheet.create({
    buttonsView: {
        alignItems: 'center',
        gap: 10,
        marginTop: 20
    }
})