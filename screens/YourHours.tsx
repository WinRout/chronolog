import { StyleSheet, Text, View, ScrollView, FlatList } from 'react-native'
import React from 'react'

import { Typo, Colors, Screens, Boxes } from "../styles"

//Components
import CurrentDate from "../components/atoms/CurrentDate"
import Timer from '../components/atoms/Timer'
import HoursItem from '../components/molecules/HoursItem'

const YourHours = () => {
    return (

        <View style={Screens.primary}>
        <View style={styles.wrapper}>
                <Text style={styles.text}>
                    Here is a summary of the hours you worked and which day.
                </Text>
                <View style={styles.wrapper_total_time}>
                    <Text style={Typo.textXSmall}>IN TOTAL</Text>
                    <Timer text={'10:10:32'}></Timer>
                </View>
                <View style={Boxes.primary}>
                    <Text style={{ ...Typo.textXSmall, marginLeft:10, marginTop: 25 }}>WEEK #25:</Text>
                    <FlatList
                        data={[
                            {
                                date: 'Sunday, 3 September',
                                time: '05:00:31'
                            },
                            {
                                date: 'Monday, 4 September',
                                time: '05:10:01'
                            }
                        ]}
                        renderItem={({ item }) =>
                            <HoursItem
                                date={item.date}
                                time={item.time}
                            />
                        }
                    />
                </View>
        </View>
        </View>

    )
}
export default YourHours

const styles = StyleSheet.create({
    wrapper: {
        alignItems: 'center',
        width:'100%',
        alignSelf: 'center',
        gap: 0,
        marginTop: 30,

    },
    wrapper_total_time: {
        paddingTop:20,
        alignItems: 'center',
        gap: -10,
        borderColor: Colors.borderSecondary,
        borderTopWidth: 1,
        borderBottomWidth: 1,
    },
    text: {
        ...Typo.textMedium,
        color: Colors.textPrimary,
        textAlign: 'center',
        width: '85%',
    }
})