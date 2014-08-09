'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Entity = mongoose.model('Entity'),
	Sport = mongoose.model('Sport'),
	Club = mongoose.model('Club');

/**
 * Globals
 */
var user, entity, sport, club ;

/**
 * Unit tests
 */
describe('Club Model Unit Tests:', function() {
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

		sport = new Sport({
			name: 'Swimming',
			user: user
		});

		user.save(function() { 
			club = new Club ({
				name: 'Test Club Name',
				entity: entity,
				sport: sport,
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return club .save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name - zero length', function(done) { 
			club .name = '';

			return club .save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name - null', function(done) { 
			club .name = null;

			return club .save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without sport', function(done) { 
			club .sport = null;

			return club .save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without user', function(done) { 
			club .user = null;

			return club .save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Club .remove().exec();

		User.remove().exec();
		done();
	});
});