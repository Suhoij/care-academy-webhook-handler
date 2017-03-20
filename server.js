'use strict';

const Hapi = require('hapi');

// Create a server with a host and port
const server = new Hapi.Server();
const db = require('./config/sequelize');
const winston = require('./config/winston');

server.connection({
    host: 'localhost',
    port: 8081
});

// Require routing files
require('./routes/WebHook')(server, db, winston);
require('./routes/NetPromoterScore')(server, db, winston);

// Start the server
server.start((err) => {
    if (err) {
        throw err;
    }
    winston.info('Server running at:', server.info.uri);
});
