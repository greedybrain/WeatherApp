//! NPM Modules
require("dotenv").config();
const chalk = require("chalk");

//! Custom Modules
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

//! Custom Vars
const error = chalk.redBright.bold.inverse;
const success = chalk.greenBright.bold.inverse;
const log = console.log;

const location = process.argv[2];
if (!location) log(error("No location was provided"));
else {
	geocode(location, (err, { lat, long, location } = {}) => {
		if (err) return log(error(err));
		forecast(lat, long, (err, { temperature, feelslike }) => {
			if (err) return log(error(err));
			log(
				success(
					`It is now ${temperature}˚ in ${location}, but it really feels like ${feelslike}˚.`
				)
			);
		});
	});
}
