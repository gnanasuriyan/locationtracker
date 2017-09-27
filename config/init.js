/***
*	@Author: Gnanasuriyan
*/

(() => {
	'use strict';

	/**
	 * Module init function.
	 */
	module.exports = () =>  {

		if(!process.env.NODE_ENV) {
			process.env.NODE_ENV = 'development';
		}

		console.log('Environment',  process.env.NODE_ENV);
		
		try {
			require('./env/' + process.env.NODE_ENV + '.js');
		} catch(e) {
			console.log('We are unable to load specified environment: ' + process.env.NODE_ENV + ', exception: ' + e);
		}

	};

})();
