'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Entity = mongoose.model('Entity'),
	Membership = mongoose.model('Membership');

/**
 * Globals
 */
var user, entity1, entity2, membership ;

/**
 * Unit tests
 */
describe('Membership Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		entity1 = new Entity({
			entityType: 'club',
			user: user
		});

		entity2 = new Entity({
			entityType: 'person',
			user: user
		});

		user.save(function() { 
			membership = new Membership ({
				memberParent: entity1,
				memberOf: entity2,
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return membership .save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without memberParent', function(done) { 
			membership .memberParent = '';

			return membership .save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without memberOf', function(done) { 
			membership .memberOf = '';

			return membership .save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without user', function(done) { 
			membership .user = '';

			return membership .save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Membership .remove().exec();

		User.remove().exec();
		done();
	});
});