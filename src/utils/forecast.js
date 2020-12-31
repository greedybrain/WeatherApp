//! NPM Modules
const request = require('postman-request')
const chalk = require('chalk');

const forecast = (lat, long, cb) => {
        const { WEATHER_STACK_ACCESS_KEY: accessKey } = process.env
        const url = `http://api.weatherstack.com/current?access_key=${ accessKey }&query=${ lat },${ long }&units=f`
        request({ url, json: true }, (err, { body }={}) => {
                if (err) return cb("Unable to connect to weather service")
                if (body.error) return cb("Unable to find location")
                const { temperature, feelslike } = body.current
                cb(undefined, { 
                        temperature, 
                        feelslike 
                })
        }) 
}

module.exports = forecast 