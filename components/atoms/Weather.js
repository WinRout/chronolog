import { View, Text } from 'react-native'
import { useEffect, useState } from 'react'
import React from 'react'

import { getLocation } from "../../functionality/getLocation";
import { getWeather } from "../../functionality/getWeather";

import { Typo, Colors } from "../../styles"

const Weather = () => {

const [weathercode, setWeathercode] = useState(null);
const [temperature, setTemperature] = useState(null);

    useEffect(() => {
        const getLocationAndFetchWeather = async () => {
            try {
                const location = await getLocation();
                console.log('Current Location:', location);

                forecast = await getWeather(location.latitude, location.longitude);
                console.log('Weather Forecast:', forecast.current_weather);
                setWeathercode(forecast.current_weather.weathercode)
                setTemperature(forecast.current_weather.temperature)
                // Do something with the forecast data
            } catch (error) {
                console.log('Error:', error);
                // Handle the error
            }
        };

        getLocationAndFetchWeather();
    }, []);

    let weather_icon
    
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
    else {
        weather_icon = '☀️'
    }

  return (
    <View>
      <Text style={{fontSize:120}}>{weather_icon}</Text>
        <Text style={{ ...Typo.textLight, color:Colors.textPrimary ,alignSelf: 'flex-end' }}>{temperature}°C</Text>
    </View>
  )
}

export default Weather

