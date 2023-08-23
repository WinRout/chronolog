export default getAddress = (latitude, longitude) => {
    return new Promise((resolve, reject) => {
        const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&email=nikitas@pixelunicorn.co`;

        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                console.log('fetchedAddress')
                const road = () => {
                    if (data.address.road == undefined) {
                        return ''
                    }
                    else {
                        return data.address.road + ', '
                    }
                }
                const village = () => {
                    if (data.address.village == undefined) {
                        return ''
                    }
                    else {
                        return data.address.village + ', '
                    }
                }
                const town = () => {
                    if (data.address.town == undefined) {
                        return ''
                    }
                    else {
                        return data.address.town + ', '
                    }
                }
                const city = () => {
                    if (data.address.city == undefined) {
                        return ''
                    }
                    else {
                        return data.address.city + ', '
                    }
                }
                const municipality = () => {
                    if (data.address.municipality == undefined) {
                        return ''
                    }
                    else {
                        if (data.address.municipality.substring(0, 15) == 'Municipality of') {
                            return data.address.municipality.substring(16) + ', '
                        }
                        else {
                            return data.address.municipality + ', '
                        }
                    }
                }
                const country = data.address.country
                const house_number = () => {
                    if (data.address.house_number == undefined) {
                        return ''
                    }
                    else return data.address.house_number + ', '
                }
                const addr = `${house_number()}${road()}${village()}${town()}${city()}${municipality()}${country}`
                resolve(addr)
            })
            .catch((error) => {
                reject('Error at geocoding: ' + error.message);
            });
    });
};