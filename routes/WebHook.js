'use strict';

var MailChimpController = require('../controllers/MailChimp');
var TypeFormController = require('../controllers/TypeForm');
var ThoughtIndustriesController = require('../controllers/ThoughtIndustries');

module.exports = function (server, db, winston) {
    var mailChimpController = new MailChimpController(db, winston);
    var typeFormController = new TypeFormController(db, winston);
    var thoughtIndustriesController = new ThoughtIndustriesController(db, winston);


    server.bind(mailChimpController);
    server.route({
        method: 'POST',
        path: '/api/MailChimp',
        handler: mailChimpController.post
    });


	server.bind(typeFormController);
    server.route({
        method: 'POST',
        path: '/api/TypeForm',
        handler: typeFormController.post
    });


	server.bind(thoughtIndustriesController);
    server.route({
        method: 'POST',
        path: '/api/ThoughtIndustries',
        handler: thoughtIndustriesController.post
    });
};
