import { PermissionsAndroid, Platform } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

export const getLocation = () => {
    return new Promise((resolve, reject) => {
        const requestLocationPermission = async () => {
            if (Platform.OS === 'ios') {
                Geolocation.requestAuthorization('whenInUse');
                fetchLocation();
            } else {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    fetchLocation();
                } else {
                    reject('Location permission denied');
                }
            }
        };

        const fetchLocation = () => {
            Geolocation.getCurrentPosition(
                (position) => {
                    resolve(position.coords);
                },
                (error) => {
                    reject('Error getting location: ' + error.message);
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            );
        };

        requestLocationPermission();
    });
};