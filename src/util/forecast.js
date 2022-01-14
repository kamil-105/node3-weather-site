const request = require('request')
const forecast = (latitude,longitude,callback) => {
    const url = "http://api.weatherstack.com/current?access_key=2b65aad3927f311cbd828297a3d41e94&query="+latitude+","+longitude
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback("Unable to connect to weather API",undefined)
        }
        else if (response.body.error){
            callback('Unable to find location',undefined)
        }
        else {
            callback(undefined, response.body.current.weather_descriptions[0] + ". Currently temperature is " + response.body.current.temperature + " but it feels like " + response.body.current.feelslike)
        }
    })
}

module.exports=forecast