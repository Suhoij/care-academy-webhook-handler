'use strict';

const TypeFormResponseDTO   = require('../dto/TypeFormResponse');
const MailChimp             = require('../services/MailChimp');

const TypeFormController = function(db, winston) {
    this.db         = db;
    this.winston    = winston;
    this.mailchimp  = new MailChimp(winston);
}

TypeFormController.prototype._logTypeFormInfo = function(...params) {
	params[0] = '[TYPEFORM] ' + params[0];
	this.winston.info(params);
};

TypeFormController.prototype._logTypeFormError = function (...params) {
	params[0] = '[TYPEFORM] ' + params[0];
	this.winston.error(params);
};


// [POST] /api/TypeForm
TypeFormController.prototype.post = function(request, reply) {

    this._logTypeFormInfo('Received a web hook from TypeForm. Request data is: %s', request.payload);

    const model     = this.db.WebHookJson.build();
    model.origin    = this.db.WebHookJson.Origins.TYPE_FORM;
    model.data      = request.payload;

    model
        .save()
        .then(function () {
            const dto = new TypeFormResponseDTO(request.payload);

	        this._logTypeFormInfo('DTO object built based on this data', dto);

            if (dto.getHidden('email')) {

	            this._logTypeFormInfo('Updating the score and level of caregiver with email: %s setting the score: %s', dto.getHidden('email'), dto.getCalculatedScore());
	            this.mailchimp.updateCareGiverScoreAndLevel(
                    dto.getHidden('email'),
                    dto.getCalculatedScore()
                );
            } else {
                this._logTypeFormError('Submitted TypeForm "%s" with event ID "%s" is missing email.', dto.getFormId(), dto.getEventId());
            }
        }.bind(this))
        .catch(function(err) {
	        this._logTypeFormError( err);
        }.bind(this));

    reply();
};

module.exports = TypeFormController;
