export const getWeather = (latitude, longitude) => {
    return new Promise((resolve, reject) => {
        const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=auto&forecast_days=1`;

        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                resolve(data);
            })
            .catch((error) => {
                reject('Error fetching weather forecast: ' + error.message);
            });
    });
};