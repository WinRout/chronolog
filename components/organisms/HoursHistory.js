import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from "@react-navigation/native";

import { dateToJson, formatTime, dateToTimeStr } from '../../functionality/mainFunctions';
import { categorizeItemsByWeek } from '../../functionality/categorizeItemsByWeek';

import { Boxes } from '../../styles';

import HoursItem from '../molecules/HoursItem';
import TotalTime from '../molecules/TotalTime';

const HoursHistory = () => {

    const [history, setHistory] = useState(undefined);
    const [totalTime, setTotalTime] = useState(0);
    const isFocused = useIsFocused();

    const loadHistory = async () => {
        try {
            storedHistory = await AsyncStorage.getItem('hoursHistory');
            const parsedHistory = JSON.parse(storedHistory);
            console.log('parsed histroy')
            console.log(parsedHistory);
            items = Object.entries(parsedHistory);
            [total, categorizedItems] = categorizeItemsByWeek(items);
            //console.log(total, categorizedItems)

            const hourEntries = categorizedItems[29];
            console.log('hourEntries: ', hourEntries);
     
            
            setHistory(hourEntries);
            setTotalTime(total);
            
        } catch(err) {
            console.log('error parsing data from storage: ', err);
        }
    }

    useEffect(() => {
        if (isFocused){
            loadHistory();
        }
    }, [isFocused]);
    

  return (
    <View >
        <TotalTime time={formatTime(totalTime)}></TotalTime>
        <View style={{...Boxes.primary, ...styles.historyTable}}>
            {/* <Text style={{ ...Typo.textXSmall, marginLeft: 10, marginTop: 25 }}>WEEK #25:</Text> */}
            { history &&
            history.map( ([key, value]) => {
                console.log("key-value: ", key,value)
                return <HoursItem key={key} date={value.date} timeIn={value.timeIn} timeOut={value.timeOut} time={value.time}></HoursItem>
            }
            )}
        </View>
    </View>
  )
}

export default HoursHistory

const styles = StyleSheet.create({
    historyTable: {
        marginTop: 20
    }
})