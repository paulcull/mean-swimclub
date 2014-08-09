'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Membership Schema
 */
var MembershipSchema = new Schema({
	memberParent: {
		type: Schema.ObjectId,
		ref: 'Entity',
		required: '{PATH} is required'
	},
	memberOf: {
		type: Schema.ObjectId,
		ref: 'Entity',
		required: '{PATH} is required'
	},
	startDate: {
		type: Date,
		default: Date.now
	},
	endDate: {
		type: Date
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

mongoose.model('Membership', MembershipSchema);