import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableWithoutFeedback, Animated, Text, StyleSheet } from 'react-native';

import { Buttons, Colors } from '../../styles';

const LongPressButton = ( { text = "Button", onPress = null } ) => {
    const [animation] = useState(new Animated.Value(0));
    const timeoutRef = useRef(null);

    const handlePressIn = () => {
        Animated.timing(animation, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: false,
        }).start();
        timeoutRef.current = setTimeout(handleLongPress, 1500);
    };

    const handlePressOut = () => {
        Animated.timing(animation, {
            toValue: 0,
            duration: 500,
            useNativeDriver: false,
        }).start();
        clearTimeout(timeoutRef.current);
    };

    const handleLongPress = () => {
        onPress();
    }

    const colorInterpolation = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [Colors.green, 'black'], // Change the colors as desired
    });

    const animatedStyle = {
        backgroundColor: colorInterpolation
    };

    return (
        <View>
            <TouchableWithoutFeedback onPressIn={handlePressIn} onPressOut={handlePressOut}>
                    <Animated.View style={[Buttons.primary, animatedStyle]}>
                        <Text style={Buttons.primary_text}>{text}</Text>
                    </Animated.View>
            </TouchableWithoutFeedback>
        </View>
    );
};

export default LongPressButton;
