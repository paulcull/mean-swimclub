'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Entity = mongoose.model('Entity'),
	Venue = mongoose.model('Venue');

/**
 * Globals
 */
var user, entity, venue ;

/**
 * Unit tests
 */
describe('Venue Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		entity = new Entity({
			entityType : 'person'
		});

		user.save(function() { 
			venue = new Venue ({
				name: 'Venue Name',
				entity: entity,
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return venue .save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			venue .name = '';

			return venue .save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without an entity', function(done) { 
			venue .entity = null;

			return venue .save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without an user', function(done) { 
			venue .user = null;

			return venue .save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Venue .remove().exec();

		User.remove().exec();
		done();
	});
});