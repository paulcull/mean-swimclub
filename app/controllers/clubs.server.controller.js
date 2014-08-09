'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Club = mongoose.model('Club'),
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
				message = 'Club already exists';
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
 * Create a Club
 */
exports.create = function(req, res) {
	var club = new Club(req.body);
	club.user = req.user;

	club.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(club);
		}
	});
};

/**
 * Show the current Club
 */
exports.read = function(req, res) {
	res.jsonp(req.club);
};

/**
 * Update a Club
 */
exports.update = function(req, res) {
	var club = req.club;

	club = _.extend(club, req.body);

	club.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(club);
		}
	});
};

/**
 * Delete an Club
 */
exports.delete = function(req, res) {
	var club = req.club;

	club.remove(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(club);
		}
	});
};

/**
 * List of Clubs
 */
exports.list = function(req, res) {
	Club.find().sort('-created').populate('user', 'displayName').exec(function(err, clubs) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(clubs);
		}
	});
};

/**
 * Club middleware
 */
exports.clubByID = function(req, res, next, id) {
	Club.findById(id).populate('user', 'displayName').exec(function(err, club) {
		if (err) return next(err);
		if (!club) return next(new Error('Failed to load Club ' + id));
		req.club = club;
		next();
	});
};

/**
 * Club authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.club.user.id !== req.user.id) {
		return res.send(403, 'User is not authorized');
	}
	next();
};