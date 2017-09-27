/***
*	@Author: Gnanasuriyan
*/

(() => {
	'use strict';

	/**
	 * Module dependencies.
	 */

	let init = require('./config/init')(),
		config = require('./config/config');


	let app = require('./config/express')();

	// Start the app by listening on <port>
	app.listen(config.port);

	// Expose app
	exports = module.exports = app;

	// Logging initialization
	console.log('Application started on port and listening on ' + config.port);

})();


