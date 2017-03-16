'use strict';

const Hapi = require('hapi');

// Create a server with a host and port
const server = new Hapi.Server();
const db = require('./config/sequelize');
const winston = require('./config/winston');

server.connection({
    host: 'localhost',
    port: 8000
});

// Require routing files
require('./routes/WebHooks')(server, db, winston);

// Start the server
server.start((err) => {
    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});
