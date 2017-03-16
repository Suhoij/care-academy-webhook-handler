'use strict';

const _ = require('lodash');
const TYPE_FORM_SCORE_QUESTION_ID = 44122510;
const TYPE_FORM_COMMENT_QUESTION_ID = 44122589;

function NetPromoterScoreController(db, winston) {
    this.db = db;
    this.winston = winston;
}

// GET: /api/NetPromoterScore
NetPromoterScoreController.prototype.get = function(request, reply) {
    this.db.NpsView.findOrInitialize({
        defaults: {
            promoters: 0,
            detractors: 0,
            totalCount: 0
        },
        where: {
            className: '',
            agency: ''
        }
    }).spread(function (row, meta) {
        reply(row.totalCount);
    }).catch(function (err) {
        this.winston.error(err);
        reply(0);
    }.bind(this));
};

// [GET] /api/NetPromoterScore/Geckoboard
NetPromoterScoreController.prototype.geckoBoard = function(request, reply) {
    var responseData = {
        item: 0,
        min: {
            value: -100
        },
        max: {
            value: -100
        }
    };

    this.db.NpsView.findOrInitialize({
        defaults: {
            promoters: 0,
            detractors: 0,
            totalCount: 0
        },
        where: {
            className: '',
            agency: ''
        }
    }).spread(function (row, meta) {
        responseData.item = row.totalCount;
        reply(responseData);
    }).catch(function (err) {
        this.winston.error(err);
        reply(responseData);
    }.bind(this));
};

// [GET] /api/NetPromoterScore/class/{theClass}
NetPromoterScoreController.prototype.getByClass = function(request, reply) {
    this.db.NpsView.findOrInitialize({
        defaults: {
            promoters: 0,
            detractors: 0,
            totalCount: 0
        },
        where: {
            className: request.params.className,
            agency: ''
        }
    }).spread(function (row, meta) {
        reply(row.totalCount);
    }).catch(function (err) {
        this.winston.error(err);
        reply(0);
    }.bind(this));
};

// [GET] /api/NetPromoterScore/agency/{agency}
NetPromoterScoreController.prototype.getByAgency = function(request, reply) {
    this.db.NpsView.findOrInitialize({
        defaults: {
            promoters: 0,
            detractors: 0,
            totalCount: 0
        },
        where: {
            className: '',
            agency: request.params.agency
        }
    }).spread(function (row, meta) {
        reply(row.totalCount);
    }).catch(function (err) {
        this.winston.error(err);
        reply(0);
    }.bind(this));
};

// [POST] /api/NetPromoterScore
NetPromoterScoreController.prototype.post = function(request, reply) {
    var score = Array.from(_.get(request.payload, 'form_response.answers', []))
        .reduce(function (result, answer) {
            if (answer['field']['id'] == TYPE_FORM_SCORE_QUESTION_ID) {
                result = answer['number'];
            }
            return result;
        }, 0);
    var comment = Array.from(_.get(request.payload, 'form_response.answers', []))
        .reduce(function (result, answer) {
            if (_.get(answer, 'field.id') == TYPE_FORM_COMMENT_QUESTION_ID) {
                result = answer['text'];
            }
            return result;
        }, '');

    var record = this.db.PromoterRecord.build();
    record.eventId = request.payload['event_id'];
    record.className = _.get(request.payload, 'form_response.hidden.course');
    record.agency = _.get(request.payload, 'form_response.hidden.agency');
    record.submittedAt = _.get(request.payload, 'form_response.submitted_at');
    record.score = score;
    record.comment = comment;
    record.isDetractor = score <= 6;
    record.isPromoter = score >= 9;

    record.save().catch(function (err) {
        this.winston.error(err);
    }.bind(this));

    reply();
};

// GET: /api/NpsComments
NetPromoterScoreController.prototype.getAllComments = function(request, reply) {
    this.db.PromoterRecord.findAll({
        attributes: ['comment'],
        where: {
            $and: [{
                comment: {
                    $ne: null
                }
            }, {
                comment: {
                    $ne: ''
                }
            }]
        }
    }).then(function (rows) {
        reply(_.map(rows, function (row) {
            return _.pick(row, 'comment');
        }))
    }).catch(function (err) {
        this.winston.error(err);
    }.bind(this));
};

// GET: /api/NetPromoterScore/comments/gecko/{count}
NetPromoterScoreController.prototype.getCommentsForGeckoBoard = function (request, reply) {
    return this.__getComments(request.params.count)
        .then(function (rows) {
            reply(_.map(rows, function (row) {
                return {
                    title: {
                        text: row.comment
                    }
                };
            }))
        }).catch(function (err) {
            this.winston.error(err);
        }.bind(this));
};

// GET: /api/NetPromoterScore/comments/{count}
NetPromoterScoreController.prototype.getComments = function (request, reply) {
    return this.__getComments(request.params.count)
        .then(function (rows) {
            reply(_.map(rows, function (row) {
                return row.comment;
            }))
        }).catch(function (err) {
            this.winston.error(err);
        }.bind(this));
};

NetPromoterScoreController.prototype.__getComments = function (limit) {
    limit = parseInt(limit);
    if (isNaN(limit) || limit > 100) {
        limit = 5;
    }

    return this.db.PromoterRecord.findAll({
        attributes: ['comment'],
        where: {
            $and: [{
                comment: {
                    $ne: null
                }
            }, {
                comment: {
                    $ne: ''
                }
            }]
        },
        limit: limit,
        order: [['submittedAt', 'DESC']]
    });
};

module.exports = NetPromoterScoreController;
