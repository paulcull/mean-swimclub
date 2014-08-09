'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var Validator = require('./validation/common.server.model');
var validate = new Validator();

/**
 * Sport Schema
 */
var SportSchema = new Schema({
	name: {
		type: [{
			type: String,
			enum: ['Swimming', 'Athletics']
		}],
		validate: [validate.nonZeroLength, 'Please provide a valid {PATH}'],
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

mongoose.model('Sport', SportSchema);