'use strict';

var env         = process.env.NODE_ENV || 'development';
const winston   = require('winston');
const Rotate    = require('winston-logrotate').Rotate;
const path      = require('path');
const CloudWatchTransport = require('winston-cloudwatch-transport');



if(env == 'production') {
	winston.add(CloudWatchTransport, {
		logGroupName    : 'web-hooks',
		logStreamName   : 'webapps',
	});
} else {

	winston.add(Rotate, {
		file        : path.resolve('app.log'), // this path needs to be absolute
		colorize    : false,
		timestamp   : true,
		json        : false,
		max         : '100m',
		keep        : 5,
		compress    : true
	});

	winston.add(winston.transports.File, {
		filename                        : 'app.log',
		handleExceptions                : true,
		humanReadableUnhandledException : true
	});
}

module.exports = winston;
