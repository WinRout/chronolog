import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
} from 'react-native-reanimated';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Button from './Button';

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
        setElapsedTime(0)
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

    const formatTime = (milliseconds: number) => {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        const formattedHours = String(hours).padStart(2, '0');
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(seconds).padStart(2, '0');

        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    };

    return (
        <View>
            <Button 
            text={ isRunning? 'Check Out': 'Check In' }
            onPress={isRunning ? stopStopwatch : startStopwatch}
            ></Button>
            <Text 
            style={[
                styles.timer_text, 
                isRunning ? styles.active : styles.inactive]}>
                {formatTime(elapsedTime)}
            </Text>
        </View>
    );
}


const styles = StyleSheet.create({
    timer_text: {
        alignSelf: 'center',
        marginTop: 30,
        fontSize: 40,
    },
    active: {
        color: 'black'
    },
    inactive: {
        color: 'gray'
    }
})

export default StopwatchTimer;
