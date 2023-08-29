import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, NativeModules, Platform, LayoutAnimation } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from "@react-navigation/native";

import { Typo, Colors, Buttons, Boxes } from '../../styles'

import Button from '../atoms/Button';
import Timer from '../atoms/Timer';
import LongPressButton from '../atoms/LongPressButton';

import StartTimer from '../molecules/StartTimer';

import { dateToSec } from '../../functionality/mainFunctions';
import { storeHours } from '../../functionality/storeHours';
import twoButtonAlert from '../../functionality/twoButtonAlert';
import { getLocation } from '../../functionality/getLocation';
import getAddress from '../../functionality/getAddress';

const { LiveActivity } = NativeModules;

const StopwatchTimer = ({navigation}) => {

    const isFocused = useIsFocused();
    const [isLoaded, setIsLoaded] = useState(false);
    const [isStoring, setIsStoring] = useState(false);
    const [clear, setClear] = useState(false)

    const [timerState, setTimerState] = useState({
        isRunning: false,
        isStarted: false,
        isFinished: false,
        startTime: undefined,
        finishTime: undefined,
        isStored: false,
        isSaved: false,
        elapsedTime: 0,
        restartTime: undefined,
        breakTime: 0,
        pauseTime: undefined,
        locationIn: undefined,
        locationOut: undefined
    });

    const [rotationAnimation] = useState(new Animated.Value(0));
    const [elapsedTime, setElapsedTime] = useState(0);
    const [icon, setIcon] = useState('⌛️');
    
    const timerRef = useRef();

    useEffect(() => {
        const loadTimerState = async () => {
            try {
                const storedState = await AsyncStorage.getItem('stopwatchTimerState');
                if (storedState != null) {
                    const parsedState = JSON.parse(storedState);
                    const startTimeDateObj = new Date (parsedState.startTime);
                    const finishTimeDateObj = new Date(parsedState.finishTime);
                    const restartTimeDateObj = new Date(parsedState.restartTime);
                    const pauseTimeDateObj = new Date(parsedState.pauseTime);
                    LayoutAnimation.easeInEaseOut();
                    setTimerState({
                        isRunning: parsedState.isRunning,
                        isStarted: parsedState.isStarted,
                        isFinished: parsedState.isFinished,
                        startTime: startTimeDateObj,
                        finishTime: finishTimeDateObj,
                        isStored: parsedState.isStored,
                        elapsedTime: parsedState.elapsedTime,
                        restartTime: restartTimeDateObj,
                        breakTime: parsedState.breakTime,
                        pauseTime: pauseTimeDateObj,
                        locationIn: parsedState.locationIn,
                        locationOut: parsedState.locationOut
                    });
                    
                    let dateReference;
                    if (parsedState.isFinished == true) {
                        dateReference = finishTimeDateObj;
                    }
                    else {
                        dateReference = new Date();
                    }
                    setElapsedTime(() => {
                        if (parsedState.isRunning) {
                            const differenceInSeconds = dateToSec(dateReference) - dateToSec(restartTimeDateObj);
                            return parsedState.elapsedTime + differenceInSeconds;
                        } 
                        else {
                            return parsedState.elapsedTime;
                        }
                    })  
                    setIcon(() => {
                        if (parsedState.isFinished == true) {
                            return '🏁';
                        }
                        else {
                            if(parsedState.isRunning) return '⏳';
                            else return '⌛️';
                        }
                    })
                    setIsLoaded(true);
                }  
                else {
                    LayoutAnimation.easeInEaseOut();
                    setTimerState({
                        isRunning: false,
                        isStarted: false,
                        isFinished: false,
                        startTime: undefined,
                        finishTime: undefined,
                        isStored: false,
                        isSaved: false,
                        elapsedTime: 0,
                        restartTime: undefined,
                        breakTime: 0,
                        pauseTime: undefined,
                        locationIn: undefined,
                        locationOut: undefined,
                    });
                    setElapsedTime(0);
                    setIcon('⌛️');
                    setIsLoaded(true);
                }
            } catch (error) {
                console.log('Error loading timer state:', error);
            }
        };
        if (isFocused) {
            loadTimerState();
        }
    }, [clear]);


    useEffect(() => {
        const saveTimerState = async (timerStateToStore) => {
            try {
                const stateToStore = JSON.stringify(timerStateToStore);
                console.log("stored: ", stateToStore);
                await AsyncStorage.setItem('stopwatchTimerState', stateToStore);
            } catch (error) {
                console.log('Error saving timer state:', error);
            }
        };
        if (timerState.isStored == true) {
            return;
        }
        else if (timerState.isFinished == true) {
            setTimerState(prevState => ({
                ...prevState,
                isStored: true
            }));
            saveTimerState({...timerState, isStored: true});
            console.log("SAVING TO HISTORY");
            setIsStoring(true)
            storeHours(timerState)
            setIsStoring(false)
            return;
        }
        else if (timerState.startTime != undefined && timerState.isSaved == false) {
            setTimerState(prevState => ({
                ...prevState,
                isSaved: true
            }));
            saveTimerState({ ...timerState, isSaved: true });
            return;
        }
        else {
            saveTimerState({ ...timerState, isSaved: true});
        }
    }, [timerState]);
    

    useEffect(() => {
        if (timerState.isRunning) {
            timerRef.current = setInterval(() => {
                // currentTime = Date()
                // setElapsedTime(currentTime - timerState.startTime)/1000;
                const currentTime = Date.now(); // Get the current timestamp in milliseconds
                const elapsedTimeInSeconds = Math.floor((currentTime - timerState.startTime)/1000 - timerState.breakTime);
                setElapsedTime(elapsedTimeInSeconds);
            }, 500);
        } else {
            clearInterval(timerRef.current);
        }

        return () => {
            clearInterval(timerRef.current);
        };
    }, [timerState.isRunning, timerState.startTime]);

    useEffect(() => {
        const rotateIconEvery3Seconds = () => {
            Animated.timing(rotationAnimation, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }).start(() => {
                rotationAnimation.setValue(0);
            });
        };

        if (timerState.isRunning) {
            const intervalId = setInterval(rotateIconEvery3Seconds, 2000);
            return () => clearInterval(intervalId);
        }
    }, [timerState.isRunning, rotationAnimation, icon]);

    const handleToggleTimer = async () => {
        const date = new Date();
        const location = await getLocation();
        try {
            const addr = await getAddress(location.latitude, location.longitude);
        } catch(error) {
            addr = 'Unknown'
        }
        LayoutAnimation.easeInEaseOut();
        setTimerState(prevState => ({
            ...prevState,
            startTime: date,
            restartTime: date,
            pauseTime: date,
            isRunning: true,
            isStarted: true,
            locationIn: {
                lat: location.latitude,
                lng: location.longitude,
                address: addr
            } 
        }));
        
        setIcon('⏳')

        if (Platform.OS === 'ios') {
            LiveActivity.startActivity(date.toISOString())
        }
       

        // Trigger animation
        Animated.timing(rotationAnimation, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start(() => {
            // Reset the rotation animation
            rotationAnimation.setValue(0);
            // Animation completed, update the icon
            setIcon('⏳');
        }); 
    };

    const handleStopTimer = () => {
        const date = new Date();
        LayoutAnimation.easeInEaseOut();
        setTimerState (prevState => ({
            ...prevState,
            isRunning: false,
            elapsedTime: elapsedTime,
            pauseTime: date,
        }));
       
        setIcon('⌛️');
       
        if (Platform.OS === 'ios') {
            LiveActivity.pauseActivity()
        }
    }

    const handleRestartTimer = () => {
        const date = new Date();
        const breakT = timerState.breakTime + dateToSec(date) - dateToSec(timerState.pauseTime);
        LayoutAnimation.easeInEaseOut();
        setTimerState (prevState => ({
            ...prevState,
            isRunning: true,
            restartTime: date,
            breakTime: breakT,
        }));
   
        setIcon('⏳');

        if (Platform.OS === 'ios') {
            LiveActivity.restartActivity()
        }
    }

    const handleResetTimer = () => {
        const reset = async () => {
            const date = new Date();
            const breakT = timerState.breakTime + dateToSec(date) - dateToSec(timerState.pauseTime);
            //get location and address
            const location = await getLocation();
            try {
                const addr = await getAddress(location.latitude, location.longitude);
            } catch(error) {
                const addr = 'Unknwon'
            }
            LayoutAnimation.easeInEaseOut();
            setTimerState(prevState => ({
                ...prevState,
                isRunning: false,
                isFinished: true,
                finishTime: date,
                elapsedTime: elapsedTime,
                breakTime: breakT,
                locationOut: {
                    lat: location.latitude,
                    lng: location.longitude,
                    address: addr
                }
            }));
            // Trigger animation
            setIcon('🏁');

            if (Platform.OS === 'ios') {
                LiveActivity.endActivity()
            }
        }
        reset();
        // twoButtonAlert({
        //     title: 'Alert', 
        //     message: 'Are you sure you want to check out?',
        //     button1_text: 'Yes',
        //     button1_onPress: reset,
        //     button2_text: 'No',
        //     button2_onPress: null,
        // })
    };

    const clearTimer = async () => {
        try {
            console.log('reseting timer');
            await AsyncStorage.removeItem('stopwatchTimerState');
            setClear((prev => !prev))
        } catch (err) {
            console.log('could not clear timer: ', err);
        }
    }

    const rotateIcon = rotationAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    const formatTime = (time) => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor(time / 60) % 60;
        const seconds = time % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const navigateFun = () => {
        navigation.navigate('YourHours', { screen: 'Today' })
    }

    return (
        <View>
            {isLoaded && !timerState.isStarted && !timerState.isFinished &&
            <StartTimer startTimerFunction={handleToggleTimer}></StartTimer>
            }
            {isLoaded && timerState.isStarted &&
            <View style={styles.box_entity}>
                {timerState.isStarted && !timerState.isFinished &&
                    <View style={styles.wrapper}>
                        <Text style={styles.text_checkedIn}>
                            ⏰You have checked in at{' '}
                            {timerState.startTime.getHours().toString().padStart(2, '0')}:
                            {timerState.startTime.getMinutes().toString().padStart(2, '0')}
                        </Text>
                        <Text style={styles.text_checkedIn}>
                            📍{timerState.locationIn.address}
                        </Text>
                    </View>
                }
                {timerState.isFinished &&
                    <View style={styles.wrapper}>
                        <Text style={styles.text_checkedIn}>
                            ⏰You have checked in at{' '}
                            {timerState.startTime.getHours().toString().padStart(2, '0')}:
                            {timerState.startTime.getMinutes().toString().padStart(2, '0')}
                        </Text>
                        <Text style={styles.text_checkedIn}>
                            📍{timerState.locationIn.address}
                        </Text>

                        <Text style={styles.text_checkedIn}>
                            🏁You have checked out at{' '}
                            {timerState.finishTime.getHours().toString().padStart(2, '0')}:
                            {timerState.finishTime.getMinutes().toString().padStart(2, '0')}
                        </Text>
                        <Text style={styles.text_checkedIn}>
                            📍{timerState.locationOut.address}
                        </Text>
                    </View>
                }
                {timerState.isStarted &&
                    <Timer text={formatTime(elapsedTime)}></Timer>
                }
    
                <Animated.Text style={[styles.icon, { transform: [{ rotate: rotateIcon,  }] }]}>{icon}</Animated.Text>
                
                {timerState.isStarted && !timerState.isFinished && timerState.isRunning &&
                <View style={styles.wrapper}>
                    <Button
                        text={'II'}
                        onPress={ handleStopTimer }
                    />
                    <Text style={styles.text}>
                        You can always pause or take a break.
                        {'\n'}When you finish, your hours will be saved.
                    </Text>
                </View>
                }
                {timerState.isStarted && !timerState.isFinished && !timerState.isRunning &&
                    <View style={styles.wrapper}>
                        <View style={{flexDirection: 'row', gap: 10}}>
                            <Button
                                text={'End'}
                                onPress={handleResetTimer}
                                style={{...Buttons.secondary_dark, width: 140}}
                            />
                            <Button
                                text={'Resume'}
                                onPress={handleRestartTimer}
                                style={{...Buttons.secondary_light, width: 140}}
                                textStyle={Buttons.secondary_light_text}
                            />
                        </View>
                        <Text style={styles.text}>
                                When you finish, your hours will be saved.
                                {'\n'}Or continue counting when you are ready.
                        </Text>
                    </View>
                }
                {!timerState.isRunning && timerState.isFinished &&
                <View style={styles.wrapper}>
                    <Button
                        text={'View'}
                        onPress = {navigateFun}
                    />
                </View>
                }
            </View>
            }
            {isLoaded && timerState.isFinished && !timerState.isRunning &&
                <View style={styles.wrapper}>
                    <Text style={{...styles.text, marginTop: 0}}>
                        You can also start counting again.
                    </Text>
                    <Button
                        text={'Start new'}
                        onPress={clearTimer}
                        style={{...Buttons.secondary_light, marginTop: 20}}
                        textStyle={Buttons.secondary_light_text}
                    />
                </View>
            }
        </View>
    );
};


const styles = StyleSheet.create({
    wrapper: {
        marginVertical: 20,
        alignItems: 'center',
        gap:0,
        float: 1,
        paddingBottom: 0
    },
    box_entity: {
        // paddingTop: 20,
        // borderWidth: 1,
        // borderColor: Colors.borderSecondary,
        // marginHorizontal: 20,
        // borderRadius: 20,
        ...Boxes.primary
    },
    text: {
        ...Typo.textLight,
        width:280,
        textAlign: 'left',
        color: Colors.textPrimary,
        marginTop: 30
    },
    icon: {
        fontSize: 50,
        alignSelf: 'center',
        color: Colors.textPrimary
    },
    text_checkedIn: {
        ...Typo.textMedium,
        color: Colors.textPrimary,
        alignSelf: 'flex-start',
        marginLeft: 30,
        marginTop: 5
    }
})

export default StopwatchTimer;
