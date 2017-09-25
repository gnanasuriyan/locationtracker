/**
*	@Author: Gnanasuriyan
*/

(function(module){
	'use strict';

	module.exports = {
		db: 'mongodb://localhost/locationtrackerprod',
		port: process.env.PORT || 3000,
		server: {
			routers: ['routes.js']
		}
	};
})(module);
