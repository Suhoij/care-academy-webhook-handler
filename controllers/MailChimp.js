'use strict';

function MailChimpController(db) {
    this.db = db;
}

// [POST] /api/MailChimp
MailChimpController.prototype.post = function(request, reply) {
    var model = this.db.WebHookJson.build();
    model.origin = this.db.WebHookJson.Origins.MAIL_CHIMP;
    model.data = request.payload;

    model
        .save()
        .catch(function(err) {
            // log error
            console.log(err);
        });

    reply();
};

module.exports = MailChimpController;
