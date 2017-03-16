'use strict';

const winston = require('winston');
const Rotate = require('winston-logrotate').Rotate;
const path = require('path');

winston.add(Rotate, {
    file: path.resolve('app.log'), // this path needs to be absolute
    colorize: false,
    timestamp: true,
    json: false,
    max: '100m',
    keep: 5,
    compress: true
});

module.exports = winston;
