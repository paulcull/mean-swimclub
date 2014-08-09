'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var memberships = require('../../app/controllers/memberships');

	// Memberships Routes
	app.route('/memberships')
		.get(memberships.list)
		.post(users.requiresLogin, memberships.create);
	
	app.route('/memberships/:membershipId')
		.get(memberships.read)
		.put(users.requiresLogin, memberships.hasAuthorization, memberships.update)
	    .delete(users.requiresLogin, memberships.hasAuthorization, memberships.delete);

	// Finish by binding the Membership middleware
	app.param('membershipId', memberships.membershipByID);
};