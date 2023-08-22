import { View, Text, StyleSheet, ActivityIndicator, LayoutAnimation } from 'react-native'
import { useEffect, useState } from 'react'
import React from 'react'

import { getLocation } from "../../functionality/getLocation";
import { getWeather } from "../../functionality/getWeather";

import { Typo, Colors } from "../../styles"
import { Skeleton } from '@rneui/base';
import { LinearGradient } from 'react-native-svg';

const Weather = ({weathercode=-1, temperature=''}) => {
    LayoutAnimation.easeInEaseOut();
    let weather_icon = ''

    if (weathercode == 0) {
        weather_icon = '☀️';
    }
    else if (weathercode == 1) {
        weather_icon = '🌤️';
    }
    else if (weathercode == 2) {
        weather_icon = '⛅️';
    }
    else if (weathercode == 3) {
        weather_icon = '☁️';
    }
    else if (weathercode == 45 || weathercode == 48) {
        weather_icon = '🌫️'
    }
    else if (weathercode >= 51 && weathercode <= 55 ) {
        weather_icon = '🌦️'
    }
    else if (weathercode == 56 || weathercode == 57 || weathercode == 66 || weathercode == 67) {
        weather_icon = '❄️'
    }
    else if (weathercode >= 61 && weathercode <= 65) {
        weather_icon = '🌧️'
    }
    else if (weathercode >= 71 && weathercode <= 77) {
        weather_icon = '🌨️'
    }
    else if (weathercode >= 80 && weathercode <= 82) {
        weather_icon = '☔️'
    }
    else if (weathercode >= 85 && weathercode <= 86) {
        weather_icon = '☃️'
    }
    else if (weathercode >= 95 && weathercode <= 99) {
        weather_icon = '⛈️'
    }
    else if (weathercode != -1) {
        weather_icon = '☀️'
    }

    if (weather_icon=='') return (
        <View style={styles.content_box}>
            <View style={styles.temperature_position}>
                <Skeleton animation="pulse" width={49} height={20} />
            </View>
            <View style={styles.icon_position}>
                <Skeleton circle animation="pulse" width={143} height={143}  />
            </View>
        </View>
    )
    else return (
    <View style={styles.content_box}>
        <View style={styles.temperature_position}>
            <Text style={styles.temperature_text}>{temperature}</Text>
        </View>
        <View style={styles.icon_position}>
            <Text style={styles.icon_text}>{weather_icon}</Text>
        </View>
    </View>
  )
}

export default Weather


const styles = StyleSheet.create({
    content_box: {
        alignSelf: 'flex-start',
        marginTop: 30,
        marginLeft: 0,
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
        gap: 120
    },

    temperature_position: { 
        alignSelf: 'flex-start'
    },

    temperature_text: {
        ...Typo.textLight,
        color: Colors.textPrimary
    },

    icon_position: {
        alignSelf: 'flex-end',
        marginTop: -80
    },

    icon_text: {
        fontSize: 120,
        color: Colors.textPrimary,
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 6,
    }
});

