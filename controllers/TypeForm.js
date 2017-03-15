'use strict';

function TypeFormController(db) {
    this.db = db;
}

// [POST] /api/TypeForm
TypeFormController.prototype.post = function(request, reply) {
    var model = this.db.WebHookJson.build();
    model.origin = this.db.WebHookJson.Origins.TYPE_FORM;
    model.data = request.payload;

    model
        .save()
        .catch(function(err) {
            // log error
            console.log(err);
        });

    reply();
};

module.exports = TypeFormController;
