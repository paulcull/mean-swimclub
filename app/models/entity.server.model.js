'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Entity Schema
 */
var EntitySchema = new Schema({
	entityType: {
		type: [{
			type: String,
			enum: ['person', 'club', 'group', 'venue']
		}],
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

mongoose.model('Entity', EntitySchema);