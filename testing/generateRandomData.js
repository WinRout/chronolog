import AsyncStorage from '@react-native-async-storage/async-storage';
import { UpdateDB } from '../database';

export const generateRandomData = async () => {
    // Function to generate a random elapsed time
    function generateRandomElapsedTime() {
        return Math.floor(Math.random() * (32401 - 1700) + 1700);
    }

    // Function to generate dummy data
    // const generateDummyData = async() => {
    //     const data = {};
    //     const endDate = new Date("2023-07-31T09:00:00+03:00");

    //     for (let i = 0; i <=500; i++) {
    //         const timestamp = new Date(endDate.getTime() - i * 24 * 60 * 60 * 1000).toString();
    //         const elapsed = generateRandomElapsedTime();
    //         data[timestamp] = {
    //             dateOut: new Date(endDate.getTime() + 1*60*60*1000+ + elapsed * 1000).toISOString(),
    //             elapsedTime: elapsed,
    //             location: {address: 'Test Address'}
    //         };
    //         console.log(elapsed)
    //         await UpdateDB.insertHourEntry(timestamp, endDate, 'Home', 'Office', elapsed, 0)
    //     }
    //     return data;
    // }

    const generateDummyData = async () => {
        const data = {};
        const endDate = new Date("2023-09-23T09:00:00+03:00");

        for (let i = 0; i <= 500; i++) {
            const timestamp = new Date(endDate.getTime() - i * 24 * 60 * 60 * 1000);
            const elapsed = generateRandomElapsedTime();
            await UpdateDB.insertHourEntry(timestamp, endDate, 'Home', 'Office', elapsed, 0)
        }
        return data;
    }

    // Generate dummy data
    const dummyData = generateDummyData();

    try {
        
        await AsyncStorage.setItem('hoursHistory', JSON.stringify(dummyData));

    } catch (error) {
        console.log('Error appending hours history item to storage: ', error);
    }
}