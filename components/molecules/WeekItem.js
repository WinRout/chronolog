import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native';

import { Typo, Colors, Boxes } from '../../styles'
import TotalTime from '../atoms/TotalTime';


const WeekItem = ({day, totalTime=0}) => {
//const navigation = useNavigation();
const handleWeekPress = () => {
   // navigation.navigate('Week Total', { year: year, weekNo: weekNo })
}

  return (
    <TouchableOpacity onPress={null} style={styles.item}>
        <Text style={styles.day_text}>{day}</Text>
        <TotalTime time={totalTime} small={true}></TotalTime>
    </TouchableOpacity>
  )
}

export default WeekItem

const styles = StyleSheet.create({
    item: {
        padding: 20,
        borderColor: Colors.borderSecondary,
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        ...Boxes.primary
    },
    button: {
       
    },
    day_text: {
        ...Typo.textMedium,
        fontSize: 18,
        width: '50%'
    },
    button_text: {
        ...Typo.textXSmall,
        fontSize: 20,
        color: Colors.textPrimary,
    }
})