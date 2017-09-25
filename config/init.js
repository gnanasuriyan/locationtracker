/***
*	@Author: Gnanasuriyan
*/

(function(module){
	'use strict';

	/**
	 * Module init function.
	 */
	module.exports = function() {
		console.log('Current execution env: ' + process.env.NODE_ENV);
		if(!process.env.NODE_ENV) {
			process.env.NODE_ENV = 'development';
		}
		try {
			require('./env/' + process.env.NODE_ENV + '.js');
		} catch(e) {
			console.log('We are unable to load specified environment: ' + process.env.NODE_ENV + ', exception: ' + e);
		}
	};

})(module);
