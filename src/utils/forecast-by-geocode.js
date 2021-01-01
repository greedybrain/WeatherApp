//! Custom Modules
const geocode = require("./geocode");
const forecast = require("./forecast");

const getForecastByGeocode = (address, res) => {
	if (!address) return res.send({ error: "Must provide an address" });

	geocode(address, (error, { lat, long, location } = {}) => {
		if (error) return res.send({ error });
		forecast(lat, long, (error, { temperature, feelslike, humidity }) => {
			if (error) return res.send({ error });
			res.send({
				temperature: (temperature += "˚"),
				feelslike: (feelslike += "˚"),
				humidity: (humidity += "˚"),
				location,
			});
		});
	});
};

module.exports = getForecastByGeocode;
