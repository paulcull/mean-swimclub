'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Discipline = mongoose.model('Discipline'),
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
				message = 'Discipline already exists';
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
 * Create a Discipline
 */
exports.create = function(req, res) {
	var discipline = new Discipline(req.body);
	discipline.user = req.user;

	discipline.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(discipline);
		}
	});
};

/**
 * Show the current Discipline
 */
exports.read = function(req, res) {
	res.jsonp(req.discipline);
};

/**
 * Update a Discipline
 */
exports.update = function(req, res) {
	var discipline = req.discipline;

	discipline = _.extend(discipline, req.body);

	discipline.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(discipline);
		}
	});
};

/**
 * Delete an Discipline
 */
exports.delete = function(req, res) {
	var discipline = req.discipline;

	discipline.remove(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(discipline);
		}
	});
};

/**
 * List of Disciplines
 */
exports.list = function(req, res) {
	Discipline.find().sort('-created').populate('user', 'displayName').exec(function(err, disciplines) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(disciplines);
		}
	});
};

/**
 * Discipline middleware
 */
exports.disciplineByID = function(req, res, next, id) {
	Discipline.findById(id).populate('user', 'displayName').exec(function(err, discipline) {
		if (err) return next(err);
		if (!discipline) return next(new Error('Failed to load Discipline ' + id));
		req.discipline = discipline;
		next();
	});
};

/**
 * Discipline authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.discipline.user.id !== req.user.id) {
		return res.send(403, 'User is not authorized');
	}
	next();
};