'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Entity = mongoose.model('Entity'),
	Person = mongoose.model('Person');

/**
 * Globals
 */
var user, user2, dob, entity, person ;

/**
 * Unit tests
 */
describe('Person Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		user2 = new User({
			firstName: 'Full',
			lastName: 'Name2',
			displayName: 'Full Name2',
			email: 'test2@test.com',
			username: 'username2',
			password: 'password'
		});

		//reminder - month is 0-11 and not 1-12
		dob = new Date(2001,0,28);

		entity = new Entity({
			entityType : 'person',
			user: user
		});

		user.save(function() { 
			person = new Person ({
				firstName: user2.firstName,
				middleInitial: '',
				lastName: user2.firstName,
				dob: dob,
				entity: entity,
				siteUser: user2,
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return person .save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to save without problems without a sitUser', function(done) {
			person .sitUser = null;

			return person .save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without date of birth', function(done) { 
			person .dob = '';

			return person .save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without an entity ref', function(done) { 
			person .entity = null;

			return person .save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without an user ref', function(done) { 
			person .user = null;

			return person .save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Person .remove().exec();

		User.remove().exec();
		done();
	});
});