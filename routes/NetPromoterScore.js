'use strict';

var NetPromoterScoreController = require('../controllers/NetPromoterScore');

module.exports = function (server, db, winston) {
    var netPromoterScoreController = new NetPromoterScoreController(db, winston);

    server.bind(netPromoterScoreController);

    server.route({
        method: 'GET',
        path: '/api/NetPromoterScore',
        handler: netPromoterScoreController.get
    });
    server.route({
        method: 'GET',
        path: '/api/NetPromoterScore/Geckoboard',
        handler: netPromoterScoreController.geckoBoard
    });
    server.route({
        method: 'GET',
        path: '/api/NetPromoterScore/class/{className}',
        handler: netPromoterScoreController.getByClass
    });
    server.route({
        method: 'GET',
        path: '/api/NetPromoterScore/agency/{agency}',
        handler: netPromoterScoreController.getByAgency
    });
    server.route({
        method: 'POST',
        path: '/api/NetPromoterScore',
        handler: netPromoterScoreController.post
    });
    server.route({
        method: 'GET',
        path: '/api/NetPromoterScore/comments',
        handler: netPromoterScoreController.getAllComments
    });
    server.route({
        method: 'GET',
        path: '/api/NetPromoterScore/comments/{count}',
        handler: netPromoterScoreController.getComments
    });
    server.route({
        method: 'GET',
        path: '/api/NetPromoterScore/comments/gecko/{count}',
        handler: netPromoterScoreController.getCommentsForGeckoBoard
    });
};
