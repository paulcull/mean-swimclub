'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var persons = require('../../app/controllers/persons');

	// Persons Routes
	app.route('/persons')
		.get(persons.list)
		.post(users.requiresLogin, persons.create);
	
	app.route('/persons/:personId')
		.get(persons.read)
		.put(users.requiresLogin, persons.hasAuthorization, persons.update)
	    .delete(users.requiresLogin, persons.hasAuthorization, persons.delete);

	// Finish by binding the Person middleware
	app.param('personId', persons.personByID);
};