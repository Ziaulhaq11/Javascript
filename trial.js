function getWeather(woeid) {
    fetch(`https://www.metaweather.com/api/location/${woeid}/`)
    .then (result => {
        console.log(result)
        return result.json();
    })
    .then(data => {
        console.log(data);
        today = data.consolidated_weather[0]
        console.log(`Today the weateher in ${data.title} is betweeen ${today.max_temp} and ${today.min_temp} ` )
    })
}

getWeather(44418);