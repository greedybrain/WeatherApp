//! NPM Modules
const request = require("postman-request");

const geocode = (addr, cb) => {
	const { MAPBOX_ACCESS_KEY: accessKey } = process.env;
	const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
		addr
	)}.json?access_token=${accessKey}&limit=1`;
	request({ url, json: true }, (err, { body } = {}) => {
		const { features = [] } = body;
		if (err) return cb("Unable to connect to location services!", undefined); // undefined = no data
		if (!features || features.length === 0)
			return cb("Please re-check location input", undefined);
		const { center = [], place_name: location } = features[0];
		const [long, lat] = center;
		cb(undefined, {
			// undefined = no error
			location,
			long,
			lat,
		});
	});
};

module.exports = geocode;
