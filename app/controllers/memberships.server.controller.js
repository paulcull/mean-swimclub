'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Membership = mongoose.model('Membership'),
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
				message = 'Membership already exists';
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
 * Create a Membership
 */
exports.create = function(req, res) {
	var membership = new Membership(req.body);
	membership.user = req.user;

	membership.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(membership);
		}
	});
};

/**
 * Show the current Membership
 */
exports.read = function(req, res) {
	res.jsonp(req.membership);
};

/**
 * Update a Membership
 */
exports.update = function(req, res) {
	var membership = req.membership;

	membership = _.extend(membership, req.body);

	membership.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(membership);
		}
	});
};

/**
 * Delete an Membership
 */
exports.delete = function(req, res) {
	var membership = req.membership;

	membership.remove(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(membership);
		}
	});
};

/**
 * List of Memberships
 */
exports.list = function(req, res) {
	Membership.find().sort('-created').populate('user', 'displayName').exec(function(err, memberships) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(memberships);
		}
	});
};

/**
 * Membership middleware
 */
exports.membershipByID = function(req, res, next, id) {
	Membership.findById(id).populate('user', 'displayName').exec(function(err, membership) {
		if (err) return next(err);
		if (!membership) return next(new Error('Failed to load Membership ' + id));
		req.membership = membership;
		next();
	});
};

/**
 * Membership authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.membership.user.id !== req.user.id) {
		return res.send(403, 'User is not authorized');
	}
	next();
};