'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Entity = mongoose.model('Entity');

/**
 * Globals
 */
var user, entity ;

/**
 * Unit tests
 */
describe('Entity Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		user.save(function() { 
			entity = new Entity ({
				entityType: 'person',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return entity .save(function(err) {
				//console.log(err);
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without entityType', function(done) { 
			entity .entityType = null;

			return entity .save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without user', function(done) { 
			entity .user = null;

			return entity .save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Entity .remove().exec();

		User.remove().exec();
		done();
	});
});