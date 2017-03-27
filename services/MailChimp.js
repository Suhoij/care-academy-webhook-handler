"use strict";

const MailChimp         = require('mailchimp-api-v3');
const crypto            = require('crypto');


const MailChimpService = function(winston) {
	this.winston    = winston;
	this.mailChimp  = new MailChimp(process.env.MAIL_CHIMP_API_KEY);
};

MailChimpService.prototype._logMailchimpInfo = function(...params)  {
	params[0] = '[MAILCHIMP] ' + params[0];
	this.winston.info(params);
};

MailChimpService.prototype._logMailchimpError = function(...params)  {
	params[0] = '[MAILCHIMP] ' + params[0];
	this.winston.error(params);
};


MailChimpService.prototype.updateCareGiverScoreAndLevel = function (email, score) {

	this._logMailchimpInfo('Sending the request to mailchimp service with params email: %s and score: %s', email, score);

	this.mailChimp.get({
		path : '/search-members?query=' + encodeURIComponent(email)
	}, function (err, result) {


		if (err) {
			this._logMailchimpError(err);
			return;
		}

		this._logMailchimpInfo('Got the response from mailchimp: %s', result);

		const member = result['exact_matches']['members'][0];
		if (!member) {
			this._logMailchimpError('Member with email "%s" was not found in MailChimp.', email);
			return;
		}

		const level = getLevelByScore(score);
		const subscriberHash = crypto.createHash('md5')
			.update(member['email_address'])
			.digest('hex');


		this._logMailchimpInfo('Sending patch request to update the mailchimp user fields: %s', '/lists/' + member['list_id'] + '/members/' + subscriberHash);
		this._logMailchimpInfo('Setting the user level: %s and score: %s', level, score);

		this.mailChimp.patch('/lists/' + member['list_id'] + '/members/' + subscriberHash,
			{
				merge_fields: {
					CRSRVSCORE  : score,
					CRLEVEL     : level
				}
			}, function (err, result) {
				if (err) {
					this._logMailchimpError('Something went wrong with the set level request: %s', err);
				} else {
					this._logMailchimpInfo('Member with email "%s" and score "%d" was given level "%d"', email, score, level);
				}
			}.bind(this));
	}.bind(this));
};


MailChimpService.prototype.updateCourseCompletionFields = function (email, courseCompletionData) {

	this._logMailchimpInfo('Sending the request to mailchimp service with params email: %s and score: %s', email, score);

	this.mailChimp.get({
		path : '/search-members?query=' + encodeURIComponent(email)
	}, function (err, result) {


		if (err) {
			this._logMailchimpError(err);
			return;
		}

		this._logMailchimpInfo('Got the response from mailchimp: %s', result);

		const member = result['exact_matches']['members'][0];
		if (!member) {
			this._logMailchimpError('Member with email "%s" was not found in MailChimp.', email);
			return;
		}

		const level = getLevelByScore(score);
		const subscriberHash = crypto.createHash('md5')
			.update(member['email_address'])
			.digest('hex');


		this._logMailchimpInfo('Sending patch request to update the mailchimp user fields: %s', '/lists/' + member['list_id'] + '/members/' + subscriberHash);
		this._logMailchimpInfo('Setting the user level: %s and score: %s', level, score);

		this.mailChimp.patch('/lists/' + member['list_id'] + '/members/' + subscriberHash,
			{
				merge_fields: {
					CRSRVSCORE  : score,
					CRLEVEL     : level
				}
			}, function (err, result) {
				if (err) {
					this._logMailchimpError('Something went wrong with the set level request: %s', err);
				} else {
					this._logMailchimpInfo('Member with email "%s" and score "%d" was given level "%d"', email, score, level);
				}
			}.bind(this));
	}.bind(this));
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


module.exports = MailChimpService;