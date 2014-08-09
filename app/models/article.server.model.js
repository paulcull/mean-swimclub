'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Article Schema
 */
var ArticleSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	title: {
		type: String,
		default: '',
		trim: true,
		required: 'Title cannot be blank'
	},
	content: {
		type: String,
		default: '',
		trim: true
	},
	visibleTo: {
		type: [{
			type: String,
			enum: ['author', 'club', 'global']
		}],
		required: 'Please enter the Entity Type'
	},
	entityScope: {
		type: Schema.ObjectId,
		ref: 'Entity'
	},	
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Article', ArticleSchema);