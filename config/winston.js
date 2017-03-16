'use strict';

var winston = require('winston');
winston.add(winston.transports.File, { filename: 'app.log' });

module.exports = winston;
