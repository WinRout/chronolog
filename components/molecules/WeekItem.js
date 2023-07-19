import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native';

import { Typo, Colors } from '../../styles'


const WeekItem = ({weekNo}) => {

const navigation = useNavigation();
const handleWeekPress = () => {
    navigation.navigate('Week Total', { weekNo: weekNo })
}

  return (
    <TouchableOpacity onPress={handleWeekPress} style={styles.item}>
        <Text style={{...Typo.textXSmall}}>week #{weekNo}</Text>
        <TouchableOpacity style={styles.button}>
            <Text style={styles.button_text}>{'>'}</Text>
        </TouchableOpacity>
    </TouchableOpacity>
  )
}

export default WeekItem

const styles = StyleSheet.create({
    item: {
        padding: 20,
        paddingBottom: 10,
        borderColor: Colors.mediumGray,
        borderBottomWidth: 1,
        marginLeft: 40,
        marginRight: 40,
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    button: {
       
    },
    button_text: {
        ...Typo.textXSmall,
        fontSize: 20,
        color: Colors.textPrimary,
    }
})