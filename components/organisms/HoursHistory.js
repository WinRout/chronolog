import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from "@react-navigation/native";

import { formatTime } from '../../functionality/mainFunctions';
import { categorizeItemsByWeek } from '../../functionality/categorizeItemsByWeek';

import { Boxes } from '../../styles';

import HoursItem from '../molecules/HoursItem';
import TotalTime from '../molecules/TotalTime';
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';
import WeekItem from '../molecules/WeekItem';

const HoursHistory = ({weekNo, fullTotal=false}) => {

    const [weeks, setWeeks] = useState(undefined);
    const [history, setHistory] = useState(undefined);
    const [totalTime, setTotalTime] = useState(0);
    const isFocused = useIsFocused();

    const loadHistory = async () => {
        try {
            storedHistory = await AsyncStorage.getItem('hoursHistory');
            const parsedHistory = JSON.parse(storedHistory);
            // console.log('parsed histroy');
            // console.log(parsedHistory);
            items = Object.entries(parsedHistory);
            [total, week_array, categorizedItems] = categorizeItemsByWeek(items);
            //console.log(week_array);

            const hourEntries = categorizedItems[weekNo];
            console.log('hourEntries: ', hourEntries);
            if (fullTotal === false) {
                total = 0;
                hourEntries.forEach((element) => {
                    total = total + element[1].timeValue;
                })
                //console.log('total: ', total);
            }
     
            setWeeks(week_array);
            setHistory(hourEntries);
            setTotalTime(total);
            
        } catch(err) {
            console.log('error parsing data from storage: ', err);
        }
    }

    useEffect(() => {
        if (isFocused){
            loadHistory();
            //console.log(weeks);
        }
    }, [isFocused]);


  return (
    <View >
        <TotalTime time={formatTime(totalTime)}></TotalTime>
        { !fullTotal &&
        <View style={{...Boxes.primary, ...styles.historyTable}}>
            {/* <Text style={{ ...Typo.textXSmall, marginLeft: 10, marginTop: 25 }}>WEEK #25:</Text> */}
            { history && 
            history.reverse().map( ([key, value]) => {
                //console.log("key-value: ", key,value)
                return <HoursItem key={key} date={value.date} timeIn={value.timeIn} timeOut={value.timeOut} time={value.time}></HoursItem>
            }
            )}
        </View>
        }
        { fullTotal && weeks && 
        <GestureHandlerRootView>
            <View style={styles.weekList}>
                {weeks.map((weekNo) => {
                    return <WeekItem key={weekNo} weekNo={weekNo}></WeekItem>
                })}
            </View> 
        </GestureHandlerRootView>
        }
    </View>
  )
}

export default HoursHistory

const styles = StyleSheet.create({
    historyTable: {
        marginTop: 20
    },
    weekList: {
        marginTop: 20,
    }
})