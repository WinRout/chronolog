import { StyleSheet, View, ScrollView } from 'react-native'
import React from 'react'

import { Typo, Colors, Screens} from "../styles"

//Components
import HoursHistory from '../components/organisms/HoursHistory'
import TotalTime from '../components/molecules/TotalTime'

const YourHours = () => {
    return (
        <ScrollView style={Screens.primary}>
            <View style={Screens.primary}>
                <HoursHistory></HoursHistory>  
            </View>              
        </ScrollView>
    )
}
export default YourHours

const styles = StyleSheet.create({
   
})