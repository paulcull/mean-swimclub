'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var entities = require('../../app/controllers/entities');

	// Entities Routes
	app.route('/entities')
		.get(entities.list)
		.post(users.requiresLogin, entities.create);
	
	app.route('/entities/:entityId')
		.get(entities.read)
		.put(users.requiresLogin, entities.hasAuthorization, entities.update)
	    .delete(users.requiresLogin, entities.hasAuthorization, entities.delete);

	// Finish by binding the Entity middleware
	app.param('entityId', entities.entityByID);
};