import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react';
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from "@react-navigation/native";

import { formatTime } from '../../functionality/mainFunctions';
import { categorizeItems } from '../../functionality/categorizeItems';

import { Boxes, Colors, Typo } from '../../styles';

import HoursItem from '../molecules/HoursItem';
import TotalTime from '../atoms/TotalTime';

import WeekItem from '../molecules/WeekItem';


const HoursHistory = ({year, weekNo, fullTotal=false}) => {

    const [weeks, setWeeks] = useState(undefined);
    const [history, setHistory] = useState(undefined);
    const [totalTime, setTotalTime] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const isFocused = useIsFocused();

    const loadHistory = async () => {
        try {
            storedHistory = await AsyncStorage.getItem('hoursHistory');
            const parsedHistory = JSON.parse(storedHistory);
            // console.log('parsed histroy');
            // console.log(parsedHistory);
            items = Object.entries(parsedHistory);
            [total, week_array, categorizedItems] = categorizeItems(items);
            console.log(week_array)
            console.log(categorizedItems)
            
            if (fullTotal === false) {
                total = 0;
                const hourEntries = categorizedItems[year][weekNo];
                console.log('hourEntries: ', hourEntries);
                hourEntries.forEach((element) => {
                    total = total + element[1].timeValue;
                })
                setHistory(hourEntries);
                //console.log('total: ', total);
            }
     
            setWeeks(week_array);
            setTotalTime(total);
            setIsLoading(false);
            
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

    if (isLoading) {
        return ( <ActivityIndicator size="large" style={{alignSelf: 'center', height:200}}/> )
    }

  return (
        <View >
            <TotalTime time={totalTime}></TotalTime>
            { !fullTotal &&
            <View style={{...Boxes.primary, ...styles.historyTable}}>
                {/* <Text style={{ ...Typo.textXSmall, marginLeft: 10, marginTop: 25 }}>WEEK #25:</Text> */}
                { history && 
                history.reverse().map( ([key, value]) => {
                    //console.log("key-value: ", key,value)
                    return <HoursItem key={key} date={value.date} timeIn={value.timeIn} timeOut={value.timeOut} time={value.time} address={value.address}></HoursItem>
                }
                )}
            </View>
            }
            { fullTotal && weeks && 
            <GestureHandlerRootView>
                <View style={styles.weekList}>
                    {Object.keys(weeks).sort().reverse().map((year) => {
                        return (
                            <View key={year}>
                                <Text style={styles.year_title_text}>{year}</Text>
                                {
                                    weeks[year].map((weekNo) => {
                                        return <WeekItem key={year+weekNo} year={year} weekNo={weekNo} />
                                    })
                                }
                            </View>
                        )
                    })}
                </View> 
            </GestureHandlerRootView>
            }
        </View>
  )
}

export default HoursHistory

const styles = StyleSheet.create({
    year_title_text: {
        ...Typo.headingBold,
        marginTop: 20,
        alignSelf: 'center',
        color: Colors.textPrimary,
    },
    historyTable: {
        marginTop: 20
    },
    weekList: {
        marginTop: 20,
    }
})