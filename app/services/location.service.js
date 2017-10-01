/***
*	@Author: Gnanasuriyan
*/

(() => {
	'use strict';

	let Location = require('../models/location.model');

	module.exports.saveLoactionDetails = (lat, lang) => {
		return new Promise((resolve, reject) => {

			let newLocation = new Location({
				lat: lat,
				lang: lang
			});

			newLocation.save((err) => {
				if (err) {
					reject({status: false, message: 'unable to save location details'});
				}
				resolve( {
					status: true,
					message: 'successfully saved location details'
				});
			});

		});
	};

	module.exports.getLocationDetails = function() {

		return new Promise((resolve, reject) => {
			Location.find({}, function(err, data) {
				if(err) {
					console.log('error', error);
					resolve([]);
				}
				resolve(data);
			});

		});
	};
	
})();
