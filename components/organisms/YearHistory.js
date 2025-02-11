import { ActivityIndicator, LayoutAnimation, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import TotalTime from '../atoms/TotalTime'
import { SelectDB } from '../../database'
import { useIsFocused } from '@react-navigation/native'
import HoursItem from '../molecules/HoursItem'
import { Boxes, Colors, Typo } from '../../styles'
import WeekItem from '../molecules/WeekItem'
import MonthHistory from './MonthHistory'
import BackButton from '../atoms/BackButton'

const YearHistory = ({ yearString }) => {

    const dayStringTransformation = (inputDate) => {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        const date = new Date(inputDate);
        const month = months[date.getMonth()];

        return `${month}`;
    }

    const isFocused = useIsFocused();
    const [isLoading, setIsLoading] = useState(true)
    const [totalTime, setTotalTime] = useState(0)
    const [entries, setEntries] = useState([])

    const [monthOn, setMonthOn] = useState(false)
    const [monthComponent, setMonthComponent] = useState(null)

    useEffect(() => {
        // Get total time
        SelectDB.getYearTotal(yearString)
            .then(result => {
                LayoutAnimation.spring()
                setTotalTime(result)
                setIsLoading(false)
            })
            .catch(error => {
                console.error(error);
            });

        SelectDB.getYearMonths(yearString)
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

    const monthPress = (monthString) => {

        LayoutAnimation.easeInEaseOut()
        setMonthComponent(
            <View>
                <View style={styles.date_position}>
                    <Text style={styles.date_text}>{dayStringTransformation(monthString)}</Text>
                </View>
                <MonthHistory monthString={monthString} />
            </View>
        )
        setMonthOn(true)
    }

    if (isLoading) return (<ActivityIndicator size="large" style={{ alignSelf: 'center', height: 200 }} />)

    else return (
        <View>
            <View style={styles.wrapper}>
                <TotalTime time={totalTime}></TotalTime>
                {/* <View style={styles.date_position}>
                    <Text style={styles.date_text}>{yearString}</Text>
                </View> */}
            </View>
            {!monthOn &&
                <View style={styles.entries_position}>
                    {entries.map(entry => {
                        return <WeekItem 
                        day={dayStringTransformation(entry.year_month)} 
                        totalTime={entry.total_time} 
                        onPress={()=>monthPress(entry.year_month)}
                        />
                    })}
                </View>
            }
            {monthOn ? (
                <>
                    <BackButton text='all months' onPress={() => { setMonthOn(false) }}></BackButton>
                    {monthComponent}
                </>
            ) : null}
        </View>


    )
}

export default YearHistory

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
        marginHorizontal: 30,
        marginTop: 20,
    },
    date_text: {
        ...Typo.headingBold,
        color: Colors.textPrimary,
    }
})