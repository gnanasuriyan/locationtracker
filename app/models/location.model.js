
/***
*	@Author: Gnanasuriyan
*/

(() => {
	'use strict';

	let mongoose = require('mongoose');
	let Schema = mongoose.Schema;

	// create a schema
	let locationSchema = new Schema({
		lat: { type: Number, required: true },
		lang: { type: Number, required: true },
		created_at: { type: Date, default: Date.now },
		updated_at: { type: Date, default: Date.now }
	});

	module.exports = mongoose.model('Location', locationSchema);
	

})();