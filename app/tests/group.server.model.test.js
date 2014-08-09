'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Entity = mongoose.model('Entity'),
	Group = mongoose.model('Group');

/**
 * Globals
 */
var user, entity, group ;

/**
 * Unit tests
 */
describe('Group Model Unit Tests:', function() {
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
			entityType: 'person',
			user: user
		});

		user.save(function() { 
			group = new Group ({
				name: 'Group Name',
				entity: entity,
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return group .save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			group .name = '';

			return group .save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without entity', function(done) { 
			group .entity = '';

			return group .save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without user', function(done) { 
			group .user = '';

			return group .save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Group .remove().exec();

		User.remove().exec();
		done();
	});
});