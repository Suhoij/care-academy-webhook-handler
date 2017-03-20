'use strict';

const TypeFormResponseDTO = require('../dto/TypeFormResponse');
const MailChimp = require('../services/MailChimp');

function TypeFormController(db, winston) {
    this.db = db;
    this.winston = winston;
}

// [POST] /api/TypeForm
TypeFormController.prototype.post = function(request, reply) {
    this.winston.info('Received a web hook from TypeForm.');

    const model = this.db.WebHookJson.build();
    model.origin = this.db.WebHookJson.Origins.TYPE_FORM;
    model.data = request.payload;

    model
        .save()
        .then(function () {
            const dto = new TypeFormResponseDTO(request.payload);

            if (dto.getHidden('email')) {
                MailChimp.updateCareGiverLevel(
                    dto.getHidden('email'),
                    dto.getCalculatedScore(),
                    this.winston
                );
            } else {
                this.winston.error('Submitted TypeForm "%s" with event ID "%s" is missing email.', dto.getFormId(), dto.getEventId());
            }
        }.bind(this))
        .catch(function(err) {
            this.winston.error(err);
        }.bind(this));

    reply();
};

module.exports = TypeFormController;
