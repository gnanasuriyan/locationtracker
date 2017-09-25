/**
*	@Author: Gnanasuriyan
*/

(function(module){
	'use strict';

	module.exports = {
		db: 'mongodb://localhost/locationtrackerdev',
		port: process.env.PORT || 3000,
		server: {
			routers: ['routes.js']
		}
	};
})(module);
