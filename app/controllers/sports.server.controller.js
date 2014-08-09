'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Sport = mongoose.model('Sport'),
	_ = require('lodash');

/**
 * Get the error message from error object
 */
var getErrorMessage = function(err) {
	var message = '';

	if (err.code) {
		switch (err.code) {
			case 11000:
			case 11001:
				message = 'Sport already exists';
				break;
			default:
				message = 'Something went wrong';
		}
	} else {
		for (var errName in err.errors) {
			if (err.errors[errName].message) message = err.errors[errName].message;
		}
	}

	return message;
};

/**
 * Create a Sport
 */
exports.create = function(req, res) {
	var sport = new Sport(req.body);
	sport.user = req.user;

	sport.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(sport);
		}
	});
};

/**
 * Show the current Sport
 */
exports.read = function(req, res) {
	res.jsonp(req.sport);
};

/**
 * Update a Sport
 */
exports.update = function(req, res) {
	var sport = req.sport;

	sport = _.extend(sport, req.body);

	sport.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(sport);
		}
	});
};

/**
 * Delete an Sport
 */
exports.delete = function(req, res) {
	var sport = req.sport;

	sport.remove(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(sport);
		}
	});
};

/**
 * List of Sports
 */
exports.list = function(req, res) {
	Sport.find().sort('-created').populate('user', 'displayName').exec(function(err, sports) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(sports);
		}
	});
};

/**
 * Sport middleware
 */
exports.sportByID = function(req, res, next, id) {
	Sport.findById(id).populate('user', 'displayName').exec(function(err, sport) {
		if (err) return next(err);
		if (!sport) return next(new Error('Failed to load Sport ' + id));
		req.sport = sport;
		next();
	});
};

/**
 * Sport authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.sport.user.id !== req.user.id) {
		return res.send(403, 'User is not authorized');
	}
	next();
};