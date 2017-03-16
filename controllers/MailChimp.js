'use strict';

function MailChimpController(db, winston) {
    this.db = db;
    this.winston = winston;
}

// [POST] /api/MailChimp
MailChimpController.prototype.post = function(request, reply) {
    this.winston.info('Received a web hook from MailChimp.');

    var model = this.db.WebHookJson.build();
    model.origin = this.db.WebHookJson.Origins.MAIL_CHIMP;
    model.data = request.payload;

    model
        .save()
        .catch(function(err) {
            this.winston.error(err);
        }.bind(this));

    reply();
};

module.exports = MailChimpController;
