"use strict";

const MailChimp = require('mailchimp-api-v3');
const crypto = require('crypto');

module.exports.updateCareGiverLevel = function (email, score, winston) {
    const mailChimp = new MailChimp(process.env.MAIL_CHIMP_API_KEY);

    mailChimp.get({
        path : '/search-members?query=' + encodeURIComponent(email)
    }, function (err, result) {
        if (err) {
            winston.error(err);
            return;
        }

        const member = result['exact_matches']['members'][0];
        if (!member) {
            winston.error('Member with email "%s" was not found in MailChimp.', email);
            return;
        }

        const level = getLevelByScore(score);
        const subscriberHash = crypto.createHash('md5')
            .update(member['email_address'])
            .digest('hex');

        mailChimp.patch({
            path: '/lists/' + member['list_id'] + '/members/' + subscriberHash,
            merge_fields: {
                CRSRVSCORE : score,
                CRLEVEL : level
            }
        }, function (err, result) {
            if (err) {
                winston.error(err);
            } else {
                winston.info('Member with email "%s" and score "%d" was given level "%d"', email, score, level);
            }
        });
    });
};

const getLevelByScore = function (score) {
    if (score >= 1 && score <= 45) {
        return 1;
    } else if (score > 45 && score <= 72) {
        return 2;
    } else if (score > 72 && score <= 83) {
        return 3;
    } else {
        return 0;
    }
};
