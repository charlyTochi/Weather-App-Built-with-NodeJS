const request = require('request');

const forecast = (longitude, latitude, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=a8e0c3d0648be0096760ee13aa765e8a&query=' +latitude+','+longitude
    request({ url, json: true }, (error, { body }) =>{
        if(error){
            callback('Unable to connect to location services', undefined)
        }else if(body.error){
            callback('Unable to find location. Try another search', undefined)
        }else{
            callback(undefined, {
                result:'It is currently '+body.current.temperature +' degree out and the temperature is '+body.current.weather_descriptions 
            })
        }
    })
}
module.exports = forecast;