import { ActivityIndicator, LayoutAnimation, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import TotalTime from '../atoms/TotalTime'
import { SelectDB } from '../../database'
import { useIsFocused } from '@react-navigation/native'
import HoursItem from '../molecules/HoursItem'
import { Boxes, Colors, Typo } from '../../styles'
import { Layout } from 'react-native-reanimated'

const DayHistory = ({dayString, mainScreen=true}) => {

    const dayStringTransformation = (inputDate) => {
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        const date = new Date(inputDate);
        const dayOfWeek = daysOfWeek[date.getDay()];
        const dayOfMonth = date.getDate();
        const month = months[date.getMonth()];

        return `${dayOfWeek},${'\n'}${dayOfMonth} ${month}`;
    }

    const isFocused = useIsFocused();
    const [isLoading, setIsLoading] = useState(true)
    const [totalTime, setTotalTime] = useState(0)
    const [entries, setEntries] = useState([])

    useEffect(() => {
        // Get total time
        SelectDB.getDayTotal(dayString)
            .then(result => {
                LayoutAnimation.spring()
                setTotalTime(result)
            })
            .catch(error => {
                console.error(error);
            });

        // Get day entries
        SelectDB.getDayEntries(dayString)
            .then(queryResult => {
                const resultArray = Array.from({ length: queryResult.length }, (_, index) => queryResult.item(index));
                LayoutAnimation.spring()
                setEntries(resultArray)
                setIsLoading(false)
            })
            .catch(error => {
                console.error(error);
            });

    }, [isFocused])

    if (isLoading) return (<ActivityIndicator size="large" style={{ alignSelf: 'center', height: 200 }} />)  
    
    else return (
        <View style={styles.wrapper}>
            { mainScreen &&
            <TotalTime time={totalTime}></TotalTime>
            }
            <View style={{...Boxes.primary, width:'95%', marginLeft: -30}}>
                <View style={styles.date_position}>
                    <Text style={styles.date_text}>{dayStringTransformation(dayString)}</Text>
                </View>
                <View style={styles.entries_position}>
                    {console.log(entries)}
                    {entries.map(entry => {
                        return <HoursItem 
                        key={entry.dateIn}
                            dateIn={entry.dateIn}
                            dateOut={entry.dateOut}
                            locationIn={entry.locationIn}
                            locationOut={entry.locationOut}
                            elapsedTime={entry.elapsedTime}
                        />
                    })}
                </View>
            </View>
        </View>
  )
}

export default DayHistory

const styles = StyleSheet.create({
    wrapper: {
        gap: 10,
        marginLeft: 30,
        paddingBottom: 50
    },
    entries_position: {
        marginHorizontal: 20,
        marginTop: 10,
    },
    date_position: {
        marginHorizontal: 20,
        marginTop: 30,
    },
    date_text: {
        ...Typo.headingBold,
        color: Colors.textPrimary,
    }
})