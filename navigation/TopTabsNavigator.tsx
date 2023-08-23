import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import DayHistory from '../components/organisms/DayHistory';
import { Colors, Screens, Typo } from '../styles';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { format } from 'date-fns';

const Tab = createMaterialTopTabNavigator();

const TodayScreen = () => {
    const currentDate = new Date()
    const dayString = format(currentDate, "yyyy-MM-dd")
    return (
        <GestureHandlerRootView>
            <ScrollView>
                <DayHistory dayString={dayString}></DayHistory>
            </ScrollView>
        </GestureHandlerRootView>
        
    )
}

const WeekScreen = () => {
    return <DayHistory dayString={'2023-08-23'}></DayHistory>
}

const MonthScreen = () => {
    return <DayHistory dayString={'2023-08-23'}></DayHistory>
}

const YearScreen = () => {
    return <DayHistory dayString={'2023-08-23'}></DayHistory>
}

function TimelineTabs() {
    return (
        <Tab.Navigator
        initialRouteName='Today'
        tabBarPosition='top'
        style={{backgroundColor: 'white'}}
        sceneContainerStyle={Screens.primary}
        screenOptions={{
            swipeEnabled: false,
            tabBarStyle: { marginTop: 10, alignSelf:'center', borderWidth: 1, borderColor:'#B2B2B2', borderRadius: 30, width:'90%'},
            tabBarLabelStyle: { ...Typo.textMedium, textTransform: 'none'},
            tabBarItemStyle: {},
            tabBarContentContainerStyle:{justifyContent:'center'},
            tabBarIndicatorContainerStyle: {alignSelf: 'center', justifyContent: 'center', width:'55%', marginLeft: '5%'},
            tabBarIndicatorStyle: {backgroundColor: Colors.textPrimary},
            tabBarActiveTintColor: Colors.textPrimary,
        }}
        >
            <Tab.Screen name="Today" component={TodayScreen} />
            <Tab.Screen name="Week" component={WeekScreen} />
            <Tab.Screen name="Month" component={MonthScreen} />
            <Tab.Screen name="Year" component={YearScreen} />
        </Tab.Navigator>
    );
}

export default TimelineTabs