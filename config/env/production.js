/**
*	@Author: Gnanasuriyan
*/

(() => {
	'use strict';

	module.exports = {
		app: {
			title: 'locationtracker',
			description: 'location tracker api',
			keywords: 'location, tracker, locationtracker'
		},
		db: {
			server: 'localhost',
			name: 'locationtrackerprod'
		},
		port: process.env.PORT || 3000,
		templateEngine: 'swig',
		server: {
			routers: ['app.routes.js'],
			models: ['location.model.js']
		}
	};
})();
