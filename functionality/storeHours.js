import AsyncStorage from '@react-native-async-storage/async-storage';

import { getLocation } from './getLocation';
import getAddress from './getAddress';
import { UpdateDB } from '../database';


export const storeHours = async (timerState) => {

    //const elapsedTime = dateToSec(timerState.finishTime) - dateToSec(timerState.startTime);
    const dateIn = timerState.startTime;
    const dateOut = timerState.finishTime;
    const elapsedTime = timerState.elapsedTime;
    const breakTime = timerState.breakTime;
    const locationIn = timerState.locationIn;

    try {
        // Fetch the existing array from AsyncStorage
        const existingData = await AsyncStorage.getItem('hoursHistory');

        // Parse the retrieved data to get the JavaScript array
        let history = existingData ? JSON.parse(existingData) : {};


        // Append the new JSON data to the array
        try {
            // get current location
            const location = await getLocation();
            const addr = await getAddress(location.latitude, location.longitude);

            UpdateDB.insertHourEntry(dateIn, dateOut, locationIn.address, addr, elapsedTime, breakTime)

            const new_item = {
                [dateIn]: {
                    dateOut: dateOut,
                    elapsedTime: elapsedTime,
                    breakTime: breakTime,
                    locationIn: locationIn,
                    location: {
                        lat: location.latitude,
                        lng: location.longitude,
                        address: addr }
                    }
            } 
            console.log('new: ', new_item);
            history = { 
                ...history, 
                ...new_item 
                }
        } catch(err) {
            console.log('Could not store item. Error getting the location: ' + err);
        }
        

        // Stringify the updated array
        const updatedData = JSON.stringify(history);

        // Store the updated array back to AsyncStorage
        await AsyncStorage.setItem('hoursHistory', updatedData);

    } catch (error) {
        console.log('Error appending hours history item to storage: ', error);
    }
};