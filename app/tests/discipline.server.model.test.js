'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Sport = mongoose.model('Sport'),
	Discipline = mongoose.model('Discipline');

/**
 * Globals
 */
var user, sport, discipline ;

/**
 * Unit tests
 */
describe('Discipline Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		sport = new Sport({
			sportType : 'Swimming',
			user: user
		});

		user.save(function() { 
			discipline = new Discipline ({
				name: 'Discipline Name',
				description: 'Descipline description',
				sport: sport,
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return discipline .save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name - 0 length', function(done) { 
			discipline .name = '';

			return discipline .save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name - null', function(done) { 
			discipline .name = null;

			return discipline .save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without description - null', function(done) { 
			discipline .description = null;

			return discipline .save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without description - 0 length', function(done) { 
			discipline .description = '';

			return discipline .save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without a sport', function(done) { 
			discipline .sport = null;

			return discipline .save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without a user', function(done) { 
			discipline .user = null;

			return discipline .save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Discipline .remove().exec();

		User.remove().exec();
		done();
	});
});