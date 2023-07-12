import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from "@react-navigation/native";

import { dateToJson, formatTime } from '../../functionality/mainFunctions';

import { Boxes, Typo } from '../../styles';

import HoursItem from '../molecules/HoursItem';
import TotalTime from '../molecules/TotalTime';

const HoursHistory = () => {

    const [history, setHistory] = useState(undefined);
    const [totalTime, setTotalTime] = useState(0);
    const isFocused = useIsFocused();

    const loadHistory = async () => {
        try {
            console.log('parsing histroy:')
            storedHistory = await AsyncStorage.getItem('hoursHistory');
            const parsedHistory = JSON.parse(storedHistory);
            console.log(parsedHistory);

            const hourEntries = [];
            let total = 0;
            Object.entries(parsedHistory).forEach((entry) => {
                const [fullDate, values] = entry;
                total = total + values.elapsedTime;
                dateArr = dateToJson(fullDate);
                dateStr = `${dateArr.weekday}, ${dateArr.day_no} ${dateArr.month}`;
                timeStr = formatTime(values.elapsedTime);
                hourEntries.push({key: fullDate, date: dateStr, time: timeStr});
            })
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
    <View>
        <TotalTime time={formatTime(totalTime)}></TotalTime>
        <View style={Boxes.primary}>
            {/* <Text style={{ ...Typo.textXSmall, marginLeft: 10, marginTop: 25 }}>WEEK #25:</Text> */}
            { history &&
            history.map( ({key, date, time}) =>
                <HoursItem key={key} date={date} time={time}></HoursItem>
            )}
        </View>
    </View>
  )
}

export default HoursHistory

const styles = StyleSheet.create({})