'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var entities = require('../../app/controllers/entities');

/**
 * Person Schema
 */
var PersonSchema = new Schema({
	firstName: {
		type: String,
		trim: true,
		default: '',
	},
	middleInitial: {
		type: String,
		trim: true,
		default: '',
	},
	lastName: {
		type: String,
		trim: true,
		default: '',
	},
	dob: {
		type: Date,
		required: 'Please enter Date of Birth'
	},
	entity: {
		type: Schema.ObjectId,
		ref: 'Entity',
		required: '{PATH} is required'
	},
	siteUser: {
		type: Schema.ObjectId,
		ref: 'User'
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

mongoose.model('Person', PersonSchema);