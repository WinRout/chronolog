import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
} from 'react-native-reanimated';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Button from '../atoms/Button';
import Timer from '../atoms/Timer';

const StopwatchTimer = () => {
    const [isRunning, setIsRunning] = useState(false);
    const [startTime, setStartTime] = useState(0);
    const [elapsedTime, setElapsedTime] = useState(0);
    const timerRef = useRef<NodeJS.Timeout | undefined>(undefined); // Adjust the type
    

    useEffect(() => {
        const retrieveCounterValue = async () => {
            try {
                const storedStartTime = await AsyncStorage.getItem('startTime');
                const storedIsRunning = await AsyncStorage.getItem('isRunning');
                const storedElapsedTime = await AsyncStorage.getItem('elapsedTime');
                if (storedStartTime !== null) {
                    setStartTime(parseInt(storedStartTime));
                }
                if (storedIsRunning !== null) {
                    setIsRunning(JSON.parse(storedIsRunning));
                }
                if (storedElapsedTime !== null) {
                    setIsRunning(JSON.parse(storedElapsedTime));
                }
            } catch (error) {
                console.log('Error retrieving counter value:', error);
            }
        };

        retrieveCounterValue();
    }, []);

    const storeCounterValue = async () => {
        try {
            await AsyncStorage.setItem('startTime', startTime.toString());
            await AsyncStorage.setItem('isRunning', isRunning.toString());
            await AsyncStorage.setItem('elapsedTime', elapsedTime.toString());
        } catch (error) {
            console.log('Error storing counter value:', error);
        }
    };


    const startStopwatch = () => {
        setStartTime(Date.now());
        setIsRunning(true);
        timerRef.current = setInterval(() => {
            setElapsedTime(Date.now() - startTime);
        }, 1000);
        storeCounterValue();
    };

    const stopStopwatch = () => {
        clearInterval(timerRef.current);
        setIsRunning(false);
        storeCounterValue();
    };

    return (
        <View style={styles.stopwatchTimer_box}>
            <Button 
            text={ isRunning? 'Check Out': 'Check In' }
            onPress={isRunning ? stopStopwatch : startStopwatch}
            ></Button>
            <Timer time={elapsedTime}></Timer>
        </View>
    );
}


const styles = StyleSheet.create({
    stopwatchTimer_box: {
        alignItems: 'center'
    }
})

export default StopwatchTimer;
