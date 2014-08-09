'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Venue = mongoose.model('Venue'),
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
				message = 'Venue already exists';
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
 * Create a Venue
 */
exports.create = function(req, res) {
	var venue = new Venue(req.body);
	venue.user = req.user;

	venue.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(venue);
		}
	});
};

/**
 * Show the current Venue
 */
exports.read = function(req, res) {
	res.jsonp(req.venue);
};

/**
 * Update a Venue
 */
exports.update = function(req, res) {
	var venue = req.venue;

	venue = _.extend(venue, req.body);

	venue.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(venue);
		}
	});
};

/**
 * Delete an Venue
 */
exports.delete = function(req, res) {
	var venue = req.venue;

	venue.remove(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(venue);
		}
	});
};

/**
 * List of Venues
 */
exports.list = function(req, res) {
	Venue.find().sort('-created').populate('user', 'displayName').exec(function(err, venues) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(venues);
		}
	});
};

/**
 * Venue middleware
 */
exports.venueByID = function(req, res, next, id) {
	Venue.findById(id).populate('user', 'displayName').exec(function(err, venue) {
		if (err) return next(err);
		if (!venue) return next(new Error('Failed to load Venue ' + id));
		req.venue = venue;
		next();
	});
};

/**
 * Venue authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.venue.user.id !== req.user.id) {
		return res.send(403, 'User is not authorized');
	}
	next();
};