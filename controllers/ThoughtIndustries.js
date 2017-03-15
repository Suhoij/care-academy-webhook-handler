'use strict';

function ThoughtIndustriesController(db) {
    this.db = db;
}

// [POST] /api/ThoughtIndustries
ThoughtIndustriesController.prototype.post = function(request, reply) {
    var model = this.db.WebHookJson.build();
    model.origin = this.db.WebHookJson.Origins.THOUGHT_INDUSTRIES;
    model.data = request.payload;

    model
        .save()
        .catch(function(err) {
            // log error
            console.log(err);
        });

    reply();
};

module.exports = ThoughtIndustriesController;
