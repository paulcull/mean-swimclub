'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var Validator = require('./validation/common.server.model');
var validate = new Validator();

/**
 * Club Schema
 */
var ClubSchema = new Schema({
	name: {
		type: String,
		default: '',
		trim: true,
		validate: [validate.nonZeroLength, 'Please provide a Club Name']
	},
	entity: {
		type: Schema.ObjectId,
		ref: 'Entity',
		required: '{PATH} is required'
	},
	sport: {
		type: Schema.ObjectId,
		ref: 'Sport',
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

mongoose.model('Club', ClubSchema);