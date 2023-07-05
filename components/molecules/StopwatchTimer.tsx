import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { Typo, Colors } from '../../styles'

import Button from '../atoms/Button';
import Timer from '../atoms/Timer';
import twoButtonAlert from '../../functionality/twoButtonAlert';

const StopwatchTimer = () => {
    const [isRunning, setIsRunning] = useState(false);
    const [isStarted, setIsStarted] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [startTime, setStartTime] = useState(Object);
    const [rotationAnimation] = useState(new Animated.Value(0));
    const [icon, setIcon] = useState('⌛️')
    const timerRef = useRef<NodeJS.Timeout | undefined>();

    // useEffect(() => {
    //     const loadTimerState = async () => {
    //         try {
    //             const storedState = await AsyncStorage.getItem('stopwatchTimerState');
    //             if (storedState) {
    //                 const { isRunning: storedIsRunning, startTime: storedStartTime } = JSON.parse(storedState);
    //                 setIsRunning(storedIsRunning);
    //                 setStartTime(storedStartTime);
    //             }
    //         } catch (error) {
    //             console.log('Error loading timer state:', error);
    //         }
    //     };

    //     loadTimerState();
    // }, []);

    // useEffect(() => {
    //     const saveTimerState = async () => {
    //         try {
    //             const stateToStore = JSON.stringify({ isRunning, startTime });
    //             await AsyncStorage.setItem('stopwatchTimerState', stateToStore);
    //         } catch (error) {
    //             console.log('Error saving timer state:', error);
    //         }
    //     };

    //     saveTimerState();
    // }, [isRunning, elapsedTime]);

    useEffect(() => {
        if (isRunning) {
            timerRef.current = setInterval(() => {
                setElapsedTime(prevElapsedTime => prevElapsedTime + 1);
            }, 1000);
        } else {
            clearInterval(timerRef.current);
        }

        return () => {
            clearInterval(timerRef.current);
        };
    }, [isRunning]);

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

        if (isRunning) {
            const intervalId = setInterval(rotateIconEvery3Seconds, 2000);
            return () => clearInterval(intervalId);
        }
    }, [isRunning, rotationAnimation, icon]);

    const handleToggleTimer = () => {
        const date = new Date();
        setStartTime(date)
        setElapsedTime(0);
        setIsRunning(true);
        setIsStarted(true)

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

    const handleResetTimer = () => {
        const reset = () => {
            setIsRunning(false);
            setIsFinished(true);
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
        const hours = Math.floor(time/360)
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <View>
            {!isStarted && !isFinished &&
            <View style={{...styles.wrapper}}>
                    <Text style={styles.text}>
                        Start your working hours when you are ready. We will keep the time for you.
                    </Text>
                <Button
                    text={'Check in'}
                    onPress={handleToggleTimer}
                />
            </View>
            }
            {isStarted &&
            <View style={styles.wrapper}>
                <Text style={styles.text_checkedIn}>
                    📍You have checked in at {' '}
                    {startTime.getHours().toString().padStart(2, '0')}:
                    {startTime.getMinutes().toString().padStart(2, '0')}
                </Text>
                <Timer text={formatTime(elapsedTime)}></Timer>
            </View>
            }
            <Animated.Text style={[styles.icon, { transform: [{ rotate: rotateIcon,  }] }]}>{icon}</Animated.Text>
            {isStarted && !isFinished &&
            <View style={styles.wrapper}>
                <Text style={styles.text}>
                    When you finish your work you can check out and your hours will be saved.
                </Text>
                <Button
                    text={'Check out'}
                    onPress={handleResetTimer}
                />
            </View>
            }
            {!isRunning && isFinished &&
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
