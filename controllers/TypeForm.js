'use strict';

function TypeFormController(db, winston) {
    this.db = db;
    this.winston = winston;
}

// [POST] /api/TypeForm
TypeFormController.prototype.post = function(request, reply) {
    this.winston.info('Received a web hook from TypeForm.');

    var model = this.db.WebHookJson.build();
    model.origin = this.db.WebHookJson.Origins.TYPE_FORM;
    model.data = request.payload;

    model
        .save()
        .catch(function(err) {
            this.winston.error(err);
        }.bind(this));

    reply();
};

module.exports = TypeFormController;
