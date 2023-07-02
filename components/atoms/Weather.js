import { View, Text } from 'react-native'
import { useEffect, useState } from 'react'
import React from 'react'

import { getLocation } from "../../functionality/getLocation";
import { getWeather } from "../../functionality/getWeather";

const Weather = () => {

const [weathercode, setWeathercode] = useState(null);

    useEffect(() => {
        const getLocationAndFetchWeather = async () => {
            try {
                const location = await getLocation();
                console.log('Current Location:', location);

                forecast = await getWeather(location.latitude, location.longitude);
                console.log('Weather Forecast Code:', forecast.current_weather.weathercode);
                setWeathercode(forecast.current_weather.weathercode)
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
    else {
        weather_icon = '☀️'
    }

  return (
    <View>
      <Text style={{fontSize:120}}>{weather_icon}</Text>
    </View>
  )
}

export default Weather

