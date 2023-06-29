import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';

const Counter = () => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prevCount) => prevCount + 1);
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <View>
            <Text>{count}</Text>
        </View>
    );
};

export default Counter;



