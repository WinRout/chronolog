import { ActivityIndicator, LayoutAnimation, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import TotalTime from '../atoms/TotalTime'
import { SelectDB } from '../../database'
import { useIsFocused } from '@react-navigation/native'
import HoursItem from '../molecules/HoursItem'
import { Boxes, Colors, Typo } from '../../styles'
import WeekItem from '../molecules/WeekItem'
import { Layout } from 'react-native-reanimated'

const MonthHistory = ({ monthString }) => {

    const dayStringTransformation = (inputDate) => {
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        const date = new Date(inputDate);
        const dayOfWeek = daysOfWeek[date.getDay()];
        const dayOfMonth = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();

        return `${month} ${year}`;
    }

    const isFocused = useIsFocused();
    const [isLoading, setIsLoading] = useState(true)
    const [totalTime, setTotalTime] = useState(0)
    const [entries, setEntries] = useState([])

    useEffect(() => {
        // Get total time
        SelectDB.getMonthTotal(monthString)
            .then(result => {
                LayoutAnimation.spring()
                setTotalTime(result)
                setIsLoading(false)
            })
            .catch(error => {
                console.error(error);
            });

        SelectDB.getMonthWeeks(monthString)
            .then(queryResult => {
                const resultArray = Array.from({ length: queryResult.length }, (_, index) => queryResult.item(index));
                LayoutAnimation.spring()
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
                    <Text style={styles.date_text}>{dayStringTransformation(monthString)}</Text>
                </View>
            </View>
            <View style={styles.entries_position}>
                {entries.map(entry => {
                    return <WeekItem day={entry.year_week} totalTime={entry.total_time} />
                })}
            </View>
        </View>


    )
}

export default MonthHistory

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