/***
*	@Author: Gnanasuriyan
*/

(() => {
	'use strict';
	/**
 		* Module dependencies.
 	*/
	let fs = require('fs'),
		http = require('http'),
		https = require('https'),
		express = require('express'),
		morgan = require('morgan'),
		bodyParser = require('body-parser'),
		//session = require('express-session'),
		compress = require('compression'),
		methodOverride = require('method-override'),
		cookieParser = require('cookie-parser'),
		helmet = require('helmet'),
		flash = require('connect-flash'),
		config = require('./config'),
		consolidate = require('consolidate'),
		mongoose = require('mongoose'),
		// passport = require('passport'),
		// dbConfig = require('./database.js'),
		path = require('path');

	// configuration ===============================================================
	// connect to our database
	// require('./passport')(passport); // pass passport for configuration

	module.exports = () => {

		// Initialize express app
		let app = express();


		//Connecting to database
		mongoose.Promise = global.Promise;

		mongoose.connect('mongodb://' + config.db.server + '/' + config.db.name, {
			useMongoClient: true 
		});

		let promise = mongoose.connect('mongodb://' + config.db.server + '/' + config.db.name, {
			useMongoClient: true
		}).then(() => {
			console.log('Successfully connected to mongo database');
		}).catch(err=> {
			console.error('Unable to connect to mongo database', err);
		});

		app.locals.title = config.app.title;
		app.locals.description = config.app.description;
		app.locals.keywords = config.app.keywords;
		
		// Passing the request url to environment locals
		app.use((req, res, next) => {
			res.locals.url = req.protocol + '://' + req.headers.host + req.url;
			next();
		});
		
		// Should be placed before express.static
		app.use(compress({
			filter: (req, res) => {
				return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
			},
			level: 9
		}));

		app.engine('server.view.html', consolidate[config.templateEngine]);
		// Set views path and view engine
		app.set('view engine', 'server.view.html');
		app.set('views','app/views');

		
		// Showing stack errors
		app.set('showStackError', true);

		// Environment dependent middleware
		if (process.env.NODE_ENV === 'development') {
			// Enable logger (morgan)
			app.use(morgan('dev'));
			// Disable views cache
			app.set('view cache', false);
		} else if (process.env.NODE_ENV === 'production') {
			app.locals.cache = 'memory';
		}

		// Request body parsing middleware should be above methodOverride
		app.use(bodyParser.urlencoded({
			extended: true
		}));
		app.use(bodyParser.json());
		app.use(methodOverride());

		// CookieParser should be above session
		app.use(cookieParser());

		app.use(require('express-domain-middleware'));

		// connect flash for flash messages
		app.use(flash());
		// Use helmet to secure Express headers
		// app.use(helmet.xframe());
		app.use(helmet.xssFilter());
		app.use(helmet.noSniff());
		app.use(helmet.ieNoOpen());


		app.use(function(req, res, next) {
			res.header("Access-Control-Allow-Origin", "*");
			res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

			if ('OPTIONS' == req.method) {
        		res.sendStatus(200);
        	}
        	else {
        		next();
        	}
		});



		app.disable('x-powered-by');

		
		// Setting the app router and static folder
		app.use(express.static(path.resolve('./public'), {
			maxAge: 31557600000
		}));


		// Globbing routing files
		config.getServerRouters().forEach((routePath) => {
			require(path.resolve('././app/routes/' + routePath))(app);
		});

		//Loading all mongo schemas...
		config.getMongoModels().forEach((modelPath) => {
			require(path.resolve('././app/models/' + modelPath));
		});

		// Assume 'not found' in the error msgs is a 404. this is somewhat silly, but valid, you can do whatever you like, set properties, use instanceof etc.
		app.use((err, req, res, next) => {
			// If the error object doesn't exists
			if (!err) return next();
			
			// Log it
			console.error(err.stack);
			console.log('After logging issue');

			if (req.xhr) {
				res.status(500).send({ error: 'OOPS!! Something went wrong!!' });
			} else {
				res.status(500).render('500', {
					error: 'OOPS!! Something went wrong!!'
				});
			}
		});

		// Assume 404 since no middleware responded
		app.use((req, res) => {
			res.status(404).render('404', {
				url: req.originalUrl,
				error: 'Not Found'
			});
		});

		// Return Express server instance
		return app;
	};

})();
