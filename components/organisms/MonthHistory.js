import { ActivityIndicator, LayoutAnimation, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import TotalTime from '../atoms/TotalTime'
import { SelectDB } from '../../database'
import { useIsFocused } from '@react-navigation/native'
import HoursItem from '../molecules/HoursItem'
import { Boxes, Colors, Typo } from '../../styles'
import WeekItem from '../molecules/WeekItem'
import { Layout } from 'react-native-reanimated'
import { formatWeek } from '../../functionality/mainFunctions'
import WeekHistory from './WeekHistory'
import BackButton from '../atoms/BackButton'

const MonthHistory = ({ monthString }) => {

    const isFocused = useIsFocused();
    const [isLoading, setIsLoading] = useState(true)
    const [totalTime, setTotalTime] = useState(0)
    const [entries, setEntries] = useState([])

    const [weekComponent, setWeekComponent] = useState(null)
    const [weekOn, setWeekOn] = useState(false)

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

  
    const weekPress = (weekString) => {
   
        LayoutAnimation.easeInEaseOut()
        setWeekComponent(
            <View>
                <View style={styles.date_position}>
                    <Text style={styles.date_text}>{formatWeek(weekString)}</Text>
                </View>
                <WeekHistory weekString={weekString} />
            </View>
        )
        setWeekOn(true)
       
    }

    if (isLoading) return (<ActivityIndicator size="large" style={{ alignSelf: 'center', height: 200 }} />)

    else return (
        <View>
            <View style={styles.wrapper}>
                <TotalTime time={totalTime}></TotalTime>
            </View>
            { !weekOn && 
                <View style={styles.entries_position}>
                    {entries.map(entry => {
                        return <WeekItem 
                        key={entry.year_week} 
                        day={formatWeek(entry.year_week)} 
                        totalTime={entry.total_time} 
                        onPress={() => weekPress(entry.year_week)}/>
                    })}
                </View>
            }
            {weekOn ? (
                <>
                    <BackButton text='all weeks' onPress={() => {setWeekOn(false)}}></BackButton>
                    {weekComponent}
                </>
            ) : null}
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
        marginHorizontal: 30,
        marginTop: 20,
    },
    date_text: {
        ...Typo.headingBold,
        color: Colors.textPrimary,
    },
    back_button: {
        marginHorizontal: 30,
        marginTop: 10,
        gap: 15,
    },
    back_button_text: {
        ...Typo.textMedium,
        color: Colors.textPrimary
    },
    underline: {
        borderWidth: 0.8,
        borderColor: Colors.textPrimary,
        borderStyle: 'solid',
        width: 105,
        marginTop: -10
    }
})