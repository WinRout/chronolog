import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from "@react-navigation/native";

import { Typo, Colors, Buttons } from '../../styles'

import Button from '../atoms/Button';
import Timer from '../atoms/Timer';
import twoButtonAlert from '../../functionality/twoButtonAlert';

import { dateToSec } from '../../functionality/mainFunctions';
import { storeHours } from '../../functionality/storeHours';
import LongPressButton from '../atoms/LongPressButton';

const StopwatchTimer = () => {

    const isFocused = useIsFocused();

    const [timerState, setTimerState] = useState({
        isRunning: false,
        isStarted: false,
        isFinished: false,
        startTime: undefined,
        finishTime: undefined,
        isStored: false,
        isSaved: false,
        elapsedTime: 0,
        restartTime: undefined
    });

    const [rotationAnimation] = useState(new Animated.Value(0));
    const [elapsedTime, setElapsedTime] = useState(0);
    const [icon, setIcon] = useState('⌛️');
    
    const timerRef = useRef<NodeJS.Timeout | undefined>();

    useEffect(() => {
        const loadTimerState = async () => {
            try {
                const storedState = await AsyncStorage.getItem('stopwatchTimerState');
                console.log("loaded: ", storedState)
                if (storedState != null) {
                    const parsedState = JSON.parse(storedState);
                    const startTimeDateObj = new Date (parsedState.startTime);
                    const finishTimeDateObj = new Date(parsedState.finishTime);
                    const restartTimeDateObj = new Date(parsedState.restartTime);
                    
                    setTimerState({
                        isRunning: parsedState.isRunning,
                        isStarted: parsedState.isStarted,
                        isFinished: parsedState.isFinished,
                        startTime: startTimeDateObj,
                        finishTime: finishTimeDateObj,
                        isStored: parsedState.isStored,
                        elapsedTime: parsedState.elapsedTime,
                        restartTime: restartTimeDateObj,
                    });
                    
                    let dateReference: Date;
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
                            return '✅';
                        }
                        else {
                            return '⌛️';
                        }
                    })
                }  
                else {
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
                    });
                    setElapsedTime(0);
                    setIcon('⌛️');
                }
            } catch (error) {
                console.log('Error loading timer state:', error);
            }
        };
        if (isFocused) {
            loadTimerState();
        }
    }, [isFocused]);


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
            storeHours(timerState);
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
                setElapsedTime(prevElapsedTime => prevElapsedTime + 1);
            }, 1000);
        } else {
            clearInterval(timerRef.current);
        }

        return () => {
            clearInterval(timerRef.current);
        };
    }, [timerState.isRunning]);

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

        setTimerState(prevState => ({
            ...prevState,
            startTime: date,
            restartTime: date,
            isRunning: true,
            isStarted: true,
        }));
       

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
        setTimerState (prevState => ({
            ...prevState,
            isRunning: false,
            elapsedTime: elapsedTime,
        }));
    }

    const handleRestartTimer = () => {
        const date = new Date();
        setTimerState (prevState => ({
            ...prevState,
            isRunning: true,
            restartTime: date,
        }));
    }

    const handleResetTimer = () => {
        const reset = () => {
            const date = new Date();
            setTimerState(prevState => ({
                ...prevState,
                isRunning: false,
                isFinished: true,
                finishTime: date,
                elapsedTime: elapsedTime,
            }));
            // Trigger animation
            setTimeout(() => {
                setIcon('✅');
            }, 501)
        }
        twoButtonAlert({
            title: 'Alert', 
            message: 'Are you sure you want to check out?',
            button1_text: 'Yes',
            button1_onPress: reset,
            button2_text: 'No',
            button2_onPress: null,
        })
    };

    const rotateIcon = rotationAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    const formatTime = (time: number) => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor(time / 60) % 60;
        const seconds = time % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <View>
            {!timerState.isStarted && !timerState.isFinished &&
            <View style={{...styles.wrapper}}>
                    <Text style={styles.text}>
                        Start your working hours when you are ready. We will keep the time for you.
                    </Text>
                {/* <Button
                    text={'Check in'}
                    onPress={handleToggleTimer}
                /> */}
                <Button 
                    text={'Check in'}
                    onPress={handleToggleTimer}
                />
            </View>
            }
            {timerState.isStarted &&
            <View style={styles.wrapper}>
                <Text style={styles.text_checkedIn}>
                    📍You have checked in at {' '}
                    {timerState.startTime.getHours().toString().padStart(2, '0')}:
                    {timerState.startTime.getMinutes().toString().padStart(2, '0')}
                </Text>
                <Timer text={formatTime(elapsedTime)}></Timer>
            </View>
            }
  
            <Animated.Text style={[styles.icon, { transform: [{ rotate: rotateIcon,  }] }]}>{icon}</Animated.Text>
            
            {timerState.isStarted && !timerState.isFinished && timerState.isRunning &&
            <View style={styles.wrapper}>
                <Text style={styles.text}>
                    When you finish your work you can check out and your hours will be saved.
                </Text>
                <Button
                    text={'II'}
                    onPress={ handleStopTimer }
                />
            </View>
            }
            {timerState.isStarted && !timerState.isFinished && !timerState.isRunning &&
                <View style={styles.wrapper}>
                    <Text style={styles.text}>
                        When you finish your work you can check out and your hours will be saved.
                    </Text>
                    <View style={{flexDirection: 'row', gap: 10}}>
                        <Button
                            text={'End'}
                            onPress={handleResetTimer}
                            style={Buttons.secondary_dark}
                        />
                        <Button
                            text={'Resume'}
                            onPress={handleRestartTimer}
                            style={Buttons.secondary_light}
                            textStyle={Buttons.secondary_light_text}
                        />
                    </View>
                </View>
            }
            {!timerState.isRunning && timerState.isFinished &&
            <View style={styles.wrapper}>
                <Text style={styles.text}>
                    Your hours have been saved.
                </Text>
                <Button
                    text={'Check out'}
                    disabled={true}
                />
            </View>
            }
        </View>
    );
};


const styles = StyleSheet.create({
    wrapper: {
        marginTop: 30,
        alignItems: 'center',
        gap:40,
        float: 1,
        paddingBottom: 50
    },
    text: {
        ...Typo.textLight,
        width:280,
        textAlign: 'center',
        color: Colors.textPrimary
    },
    icon: {
        fontSize: 50,
        alignSelf: 'center',
    },
    text_checkedIn: {
        ...Typo.textMedium,
        color: Colors.textPrimary
    }
})

export default StopwatchTimer;
