/***
*	@Author: Gnanasuriyan
*/

(() => {
 	'use strict';
	
	var _ = require('lodash');

	/**
	 * Load app configurations
	 */
	console.log('NODE_ENV' + process.env.NODE_ENV);
	
	module.exports = _.extend(require('./env/' + process.env.NODE_ENV ), {});

	module.exports.getServerRouters = function() {
		return this.server.routers || [];
	};

	module.exports.getMongoModels = function() {
		return this.server.models || [];
	};

})();
