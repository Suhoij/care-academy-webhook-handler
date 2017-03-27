'use strict';

require('dotenv').config();
const Hapi = require('hapi');

// Create a server with a host and port
const server    = new Hapi.Server();
const db        = require('./models/index');
const winston   = require('./services/Winston');

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
        console.log(err);
    }
    winston.info('Server running at:', server.info.uri);
});