"use strict";

const _ = require('lodash');

function TypeFormResponseDTO(jsonData)
{
    this.data = jsonData;
}

TypeFormResponseDTO.prototype.get = function (key, defaultValue) {
    return _.get(this.data, key, defaultValue);
};

TypeFormResponseDTO.prototype.getEventId = function () {
    return this.get('event_id');
};
TypeFormResponseDTO.prototype.getEventType = function () {
    return this.get('event_type');
};
TypeFormResponseDTO.prototype.getFormId = function () {
    return this.get('form_response.form_id');
};
TypeFormResponseDTO.prototype.getSubmittedAtDate = function () {
    return this.get('form_response.submitted_at');
};
TypeFormResponseDTO.prototype.getCalculatedScore = function () {
    return this.get('form_response.calculated.score');
};
TypeFormResponseDTO.prototype.getHidden = function (key, defaultValue) {
    return this.get('form_response.hidden.' + key, defaultValue);
};
TypeFormResponseDTO.prototype.getAnswers = function () {
    return this.get('form_response.answers', []);
};
TypeFormResponseDTO.prototype.getAnswerById = function (id) {
    return Array.from(this.getAnswers())
        .reduce(function (result, answer) {
            if (answer['field']['id'] == id) {
                result = answer;
            }
            return result;
        }, null);
};

module.exports = TypeFormResponseDTO;
