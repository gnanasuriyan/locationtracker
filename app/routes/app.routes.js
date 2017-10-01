/***
*	@Author: Gnanasuriyan
*/

(() => {
	'use strict';

	module.exports = function(app) {
		let express = require('express');

		let locationController = require('../../app/controllers/location.tracker.controller');
		let router = express.Router({
			strict: true,
			caseSensitive: true
		});

		//router.get('/sayhello', locationController.sayHello);
		router.post('/location', locationController.saveLocation);

		app.get('/', locationController.index);
		app.use('/api', router);
	};

})();
