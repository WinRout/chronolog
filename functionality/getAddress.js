import Geocoder from 'react-native-geocoding';
Geocoder.init('AIzaSyA_4YzTGagyKtDPMx_6apzH7VBdZRlXIEM')

export default getAddress = async(lat, lng) => {
    try {
        const response = await Geocoder.from(lat, lng)
        const street = response.results[0].address_components[1].short_name
        const no = response.results[0].address_components[0].short_name
        const city = response.results[0].address_components[2].short_name
        const address = `${street} ${no}, ${city}}`
        console.log(address)
        return address
    } catch (error) {
        console.error('Error geocoding address: ', error)
    }
}