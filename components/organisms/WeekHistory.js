import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import TotalTime from '../atoms/TotalTime'
import { SelectDB } from '../../database'
import { useIsFocused } from '@react-navigation/native'
import HoursItem from '../molecules/HoursItem'
import { Boxes, Colors, Typo } from '../../styles'
import WeekItem from '../molecules/WeekItem'

const WeekHistory = ({ weekString }) => {

    const dayStringTransformation = (inputDate) => {
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        const date = new Date(inputDate);
        const dayOfWeek = daysOfWeek[date.getDay()];
        const dayOfMonth = date.getDate();
        const month = months[date.getMonth()];

        return `${dayOfWeek}`;
    }

    const isFocused = useIsFocused();
    const [isLoading, setIsLoading] = useState(true)
    const [totalTime, setTotalTime] = useState(0)
    const [entries, setEntries] = useState([])

    useEffect(() => {
        // Get total time
        SelectDB.getWeekTotal(weekString)
            .then(result => {
                setTotalTime(result)
                setIsLoading(false)
            })
            .catch(error => {
                console.error(error);
            });
        
        SelectDB.getWeekDays(weekString)
            .then(queryResult => {
                const resultArray = Array.from({ length: queryResult.length }, (_, index) => queryResult.item(index));
                setEntries(resultArray)
                console.log(resultArray)
                setIsLoading(false)
            })
            .catch(error => {
                console.error(error);
            });

    }, [isFocused])

    if (isLoading) return (<ActivityIndicator size="large" style={{ alignSelf: 'center', height: 200 }} />)

    else return (
        <View>
        <View style={styles.wrapper}>
            <TotalTime time={totalTime}></TotalTime>
    
                <View style={styles.date_position}>
                    <Text style={styles.date_text}>{weekString}</Text>
                </View>
        </View>
                <View style={styles.entries_position}>
                   {entries.map(entry => {
                    return <WeekItem day={dayStringTransformation(entry.day)} totalTime={entry.total_time}/>
                   })}
                </View>
        </View>
            
        
    )
}

export default WeekHistory

const styles = StyleSheet.create({
    wrapper: {
        gap: 10,
        marginLeft: 30,
        paddingBottom: 20
    },
    entries_position: {
        marginHorizontal: 20,
        marginTop: 10,
        gap: 15
    },
    date_position: {
        marginHorizontal: 20,
        marginTop: 20,
    },
    date_text: {
        ...Typo.headingBold,
        color: Colors.textPrimary,
    }
})