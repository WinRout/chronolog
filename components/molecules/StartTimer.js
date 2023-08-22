import { LayoutAnimation, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Skeleton } from '@rneui/themed';

import Weather from '../atoms/Weather'
import Button from '../atoms/Button'

import welcomeMessage from '../../functionality/welcomeMessage'
import { getLocation } from '../../functionality/getLocation'
import getAddress from '../../functionality/getAddress'
import { getWeather } from '../../functionality/getWeather'

import { Typo, Colors, Buttons } from '../../styles'
import { useIsFocused } from '@react-navigation/native'
import { LinearGradient } from 'react-native-svg';
import previousThursday from 'date-fns/esm/fp/previousThursday/index.js';

const StartTimer = ({startTimerFunction}) => {

    const isFocused = useIsFocused()

    const [address, setAddress] = useState('')
    const [weathercode, setWeathercode] = useState (-1)
    const [temperature, setTemperature] = useState (null)
    const [isLoaded, setIsLoaded] = useState(false)

     
    const setStates = async () => {
        try {
            lcn = await getLocation()
            try {
                addr = await getAddress(lcn.latitude, lcn.longitude)
                setAddress(addr)
                setIsLoaded(true)
            } catch (error) {
                addr = 'Could not fetch address'
            }
        }catch (error) {
            
        }
        forecast = await getWeather(lcn.latitude, lcn.longitude);
        setWeathercode(forecast.current_weather.weathercode)
        setTemperature(forecast.current_weather.temperature + ' °C')
    }
    
    useEffect(() => {
      setStates();
    }, [isFocused])
 
  return (
    <View style={styles.wrapper}>
        <View style={styles.welcome_box}>
            <Weather weathercode={weathercode} temperature={temperature} />
            <Text style={styles.welcome_text}>👋{'\n'}{welcomeMessage()}!</Text>
              <Text style={styles.text}>
                  Start and stop when you are ready.
                  {'\n'}We will keep the time and location for you.
                  {'\n'}On your device.
              </Text>
            {isLoaded && 
            <Text style={styles.location_text}>📍 {address}</Text>  
            }
            {!isLoaded &&
            <View style={{...styles.location_text, flexDirection:'row'}}>
                <Text>📍{'   '}</Text>
                <Skeleton animation="pulse" width={200} height={20} />
            </View>
            }
        </View>

        <View style={styles.start_box}>
              <Button
                  text={'Start'}
                  onPress={startTimerFunction}
              />
              <Text style={styles.icon}>⌛️</Text>
        </View>
    </View>
  )
}

export default StartTimer

const styles = StyleSheet.create({
    wrapper: {
        marginTop: 30,
    },
    location_text : {
        ...Typo.textMedium,
        color: Colors.textPrimary,
        paddingTop: 2,
        marginTop: 30
    },
    welcome_text: {
        ...Typo.textMedium,
        alignSelf: 'flex-start',
        color: Colors.textPrimary
    },
    welcome_box: {
        marginTop: -70,
        gap: 0,
        marginLeft: 50
    },
    start_box: {
        alignSelf: 'center',
        marginTop: 25,
        gap: 30
    },
    text: {
        ...Typo.textLight,
        width: 280,
        textAlign: 'left',
        color: Colors.textPrimary,
        marginTop: 35
    },
    icon: {
        fontSize: 50,
        alignSelf: 'center',
        color: Colors.textPrimary
    },
})