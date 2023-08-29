import { ActivityIndicator, LayoutAnimation, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import TotalTime from '../atoms/TotalTime'
import { SelectDB } from '../../database'
import { useIsFocused } from '@react-navigation/native'
import HoursItem from '../molecules/HoursItem'
import { Boxes, Colors, Typo } from '../../styles'
import WeekItem from '../molecules/WeekItem'

const AllHistory = () => {

    const isFocused = useIsFocused();
    const [isLoading, setIsLoading] = useState(true)
    const [totalTime, setTotalTime] = useState(0)
    const [entries, setEntries] = useState([])

    useEffect(() => {
        // Get total time
        SelectDB.getAllTotal()
            .then(result => {
                LayoutAnimation.spring()
                setTotalTime(result)
            })
            .catch(error => {
                console.error(error);
            });

        SelectDB.getAllYears()
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
                    <Text style={styles.date_text}>All Time</Text>
                </View>
            </View>
            <View style={styles.entries_position}>
                {entries.map(entry => {
                    return <WeekItem day={entry.year} totalTime={entry.total_time} />
                })}
            </View>
        </View>


    )
}

export default AllHistory

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