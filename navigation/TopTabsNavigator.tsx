import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import DayHistory from '../components/organisms/DayHistory';
import WeekHistory from '../components/organisms/WeekHistory';
import { Colors, Screens, Typo } from '../styles';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { format } from 'date-fns';
import MonthHistory from '../components/organisms/MonthHistory';
import YearHistory from '../components/organisms/YearHistory';
import AllHistory from '../components/organisms/AllHistory';

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
    const currentDate = new Date()
    const weekString = format(currentDate, "yyyy-ww")
    return (
        <GestureHandlerRootView>
            <ScrollView>
                <WeekHistory weekString={weekString}></WeekHistory>
            </ScrollView>
        </GestureHandlerRootView>
    )
}

const MonthScreen = () => {
    const currentDate = new Date()
    const monthString = format(currentDate, "yyyy-MM")
    return (
    <GestureHandlerRootView>
        <ScrollView>
            <MonthHistory monthString={monthString}></MonthHistory>
        </ScrollView>
    </GestureHandlerRootView>
    )
}

const YearScreen = () => {
    const currentDate = new Date()
    const yearString = format(currentDate, "yyyy")
    return (
        <GestureHandlerRootView>
            <ScrollView>
                <YearHistory yearString={yearString}></YearHistory>
            </ScrollView>
        </GestureHandlerRootView>
    )
}

const AllScreen = () => {
    return (
        <GestureHandlerRootView>
            <ScrollView>
                <AllHistory></AllHistory>
            </ScrollView>
        </GestureHandlerRootView>
    )
}

function TimelineTabs() {
    return (
        <Tab.Navigator
        initialRouteName='Today'
        tabBarPosition='top'
        style={{backgroundColor: 'white'}}
        sceneContainerStyle={Screens.primary}
        screenOptions={{
            swipeEnabled: true,
            tabBarStyle: { marginTop: 10, alignSelf:'center', borderWidth: 1, borderColor:'#B2B2B2', borderRadius: 30, width:'90%'},
            tabBarLabelStyle: { ...Typo.textLight, textTransform: 'none'},
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
            <Tab.Screen name="All" component={AllScreen} />
        </Tab.Navigator>
    );
}

export default TimelineTabs