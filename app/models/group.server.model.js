'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var Validator = require('./validation/common.server.model');
var validate = new Validator();

/**
 * Group Schema
 */
var GroupSchema = new Schema({
	name: {
		type: String,
		default: '',
		validate: [validate.nonZeroLength, 'Please provide a valid Group Name'],
		trim: true
	},
	entity: {
		type: Schema.ObjectId,
		ref: 'Entity',
		required: '{PATH} is required'
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

mongoose.model('Group', GroupSchema);