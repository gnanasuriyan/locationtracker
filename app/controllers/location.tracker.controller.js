/***
*	@Author: Gnanasuriyan
*/

(() => {
	'use strict';

	let locationService = require('../services/location.service');

	module.exports.index = (req, res) => {
		locationService.getLocationDetails().then((data) => {
			res.render('index', {
				locations: data
			});
		}).catch((err) => {
			res.render('error', {
				
			});
		});

		
	};

	module.exports.saveLocation = (req, res) => {
		locationService.saveLoactionDetails(req.body.lat, req.body.lang).then(data => {
			res.json(data);
		}).catch(err => {
			res.json(err);
		});
	};

})();
