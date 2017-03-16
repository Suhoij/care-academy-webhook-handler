'use strict';

function ThoughtIndustriesController(db, winston) {
    this.db = db;
    this.winston = winston;
}

// [POST] /api/ThoughtIndustries
ThoughtIndustriesController.prototype.post = function(request, reply) {
    this.winston.info('Received a web hook from ThoughtIndustries.');

    var model = this.db.WebHookJson.build();
    model.origin = this.db.WebHookJson.Origins.THOUGHT_INDUSTRIES;
    model.data = request.payload;

    model
        .save()
        .catch(function(err) {
            this.winston.error(err);
        }.bind(this));

    reply();
};

module.exports = ThoughtIndustriesController;
