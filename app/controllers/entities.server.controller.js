'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Entity = mongoose.model('Entity'),
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
				message = 'Entity already exists';
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
 * Create a Entity
 */
exports.create = function(req, res) {
	var entity = new Entity(req.body);
	entity.user = req.user;

	entity.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(entity);
		}
	});
};

/**
 * Show the current Entity
 */
exports.read = function(req, res) {
	res.jsonp(req.entity);
};

/**
 * Update a Entity
 */
exports.update = function(req, res) {
	var entity = req.entity;

	entity = _.extend(entity, req.body);

	entity.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(entity);
		}
	});
};

/**
 * Delete an Entity
 */
exports.delete = function(req, res) {
	var entity = req.entity;

	entity.remove(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(entity);
		}
	});
};

/**
 * List of Entities
 */
exports.list = function(req, res) {
	Entity.find().sort('-created').populate('user', 'displayName').exec(function(err, entities) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(entities);
		}
	});
};

/**
 * Entity middleware
 */
exports.entityByID = function(req, res, next, id) {
	Entity.findById(id).populate('user', 'displayName').exec(function(err, entity) {
		if (err) return next(err);
		if (!entity) return next(new Error('Failed to load Entity ' + id));
		req.entity = entity;
		next();
	});
};

/**
 * Entity authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.entity.user.id !== req.user.id) {
		return res.send(403, 'User is not authorized');
	}
	next();
};