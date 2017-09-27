/***
*	@Author: Gnanasuriyan
*/

(() => {
	'use strict';

	let locationService = require('../services/location.service');

	module.exports.sayHello = (req, res) => {
		res.json({
			status: true,
			message: 'Hello world!'
		});
	};

	module.exports.registerLocation = (req, res) => {
		locationService.saveLoactionDetails(req.body.lat, req.body.lang).then(data => {
			res.json(data);
		}).catch(err => {
			res.json(err);
		});
	};

})();
