import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { Boxes } from "../../styles"

import AccountCard from '../molecules/AccountCard'

const AccountInformation = () => {

    const data = {
        "Name": "Anastasia Masadi",
        "Birthday": "4.12",
        "Home address": "Eresou 44, 10681, Athens",
        "Country": "Greece",
        "Mobile": "6976729027",
        "Private email": "anastasia@gmail.com",
        "Role": "Design Director & Product Owner",
        "Starting date": "12-07-20",
        "Ending date": "-",
        "work email": "anastasia@pixelunicorn.co",
    }
    const profile = Object.entries(data)

    return (
        <View style={{marginBottom: 20}}>
            <Text style={Boxes.primary_title}>Personal Information</Text>
            <View style={Boxes.primary}>
                {profile.map(([key, value]) => (
                    <AccountCard title={key} content={value}></AccountCard> 
                ))}
            </View>
        </View>

    )
}


export default AccountInformation

const styles = StyleSheet.create({})