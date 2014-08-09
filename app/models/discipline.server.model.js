'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var Validator = require('./validation/common.server.model');
var validate = new Validator();

/**
 * Discipline Schema
 */
var DisciplineSchema = new Schema({
	name: {
		type: String,
		default: '',
		validate: [validate.nonZeroLength, 'Please provide a Discipline Name'],
		trim: true
	},
	description: {
		type: String,
		default: '',
		validate: [validate.nonZeroLength, 'Please provide a Discipline Description'],
		trim: true
	},
	additionalData: {},
	sport: {
		type: Schema.ObjectId,
		ref: 'Sport',
		required: 'Please provide a reference Sport'
	},	
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User',
		required: '{PATH} is required'
	}
});

mongoose.model('Discipline', DisciplineSchema);