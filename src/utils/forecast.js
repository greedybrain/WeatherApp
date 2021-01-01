//! NPM Modules
const request = require("postman-request");
const chalk = require("chalk");

const forecast = (lat, long, cb) => {
	const { WEATHER_STACK_ACCESS_KEY: accessKey } = process.env;
	const url = `http://api.weatherstack.com/current?access_key=${accessKey}&query=${lat},${long}&units=f`;
	request({ url, json: true }, (err, { body } = {}) => {
		if (err) return cb("Unable to connect to weather service", undefined); // undefined = no data
		if (body.error) return cb("Unable to find location", undefined);
		const { temperature, feelslike, humidity } = body.current;
		cb(undefined, {
			// undefined = no error
			temperature,
			feelslike,
			humidity,
		});
	});
};

module.exports = forecast;
