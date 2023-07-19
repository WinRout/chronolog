import AsyncStorage from '@react-native-async-storage/async-storage';

export const generateRandomData = async () => {
    // Function to generate a random elapsed time
    function generateRandomElapsedTime() {
        return Math.floor(Math.random() * (32401 - 1700) + 1700);
    }

    // Function to generate random location data
    function generateLocationData() {
        return {
            altitude: 0,
            heading: -1,
            altitudeAccuracy: -1,
            latitude: getRandomCoordinate(37.785, 37.786),
            longitude: getRandomCoordinate(-122.407, -122.405),
            accuracy: 5,
            speed: -1
        };
    }

    // Function to generate dummy data
    function generateDummyData() {
        const data = {};
        const startDate = new Date("2023-01-02T09:00:00+03:00");

        for (let i = 0; i < 200; i++) {
            const timestamp = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000).toString();
            const elapsed = generateRandomElapsedTime();
            data[timestamp] = {
                dateOut: new Date(startDate.getTime() + 1*60*60*1000+ + elapsed * 1000).toISOString(),
                elapsedTime: elapsed,
                //location: generateLocationData()
            };
        }

        return data;
    }


    // Generate dummy data
    const dummyData = generateDummyData();

    console.log(dummyData);

    try {
        
        await AsyncStorage.setItem('hoursHistory', JSON.stringify(dummyData));

    } catch (error) {
        console.log('Error appending hours history item to storage: ', error);
    }

}