'use strict';

(function() {
	// Memberships Controller Spec
	describe('Memberships Controller Tests', function() {
		// Initialize global variables
		var MembershipsController,
			scope,
			$httpBackend,
			$stateParams,
			$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Memberships controller.
			MembershipsController = $controller('MembershipsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Membership object fetched from XHR', inject(function(Memberships) {
			// Create sample Membership using the Memberships service
			var sampleMembership = new Memberships({
				name: 'New Membership'
			});

			// Create a sample Memberships array that includes the new Membership
			var sampleMemberships = [sampleMembership];

			// Set GET response
			$httpBackend.expectGET('memberships').respond(sampleMemberships);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.memberships).toEqualData(sampleMemberships);
		}));

		it('$scope.findOne() should create an array with one Membership object fetched from XHR using a membershipId URL parameter', inject(function(Memberships) {
			// Define a sample Membership object
			var sampleMembership = new Memberships({
				name: 'New Membership'
			});

			// Set the URL parameter
			$stateParams.membershipId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/memberships\/([0-9a-fA-F]{24})$/).respond(sampleMembership);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.membership).toEqualData(sampleMembership);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Memberships) {
			// Create a sample Membership object
			var sampleMembershipPostData = new Memberships({
				name: 'New Membership'
			});

			// Create a sample Membership response
			var sampleMembershipResponse = new Memberships({
				_id: '525cf20451979dea2c000001',
				name: 'New Membership'
			});

			// Fixture mock form input values
			scope.name = 'New Membership';

			// Set POST response
			$httpBackend.expectPOST('memberships', sampleMembershipPostData).respond(sampleMembershipResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Membership was created
			expect($location.path()).toBe('/memberships/' + sampleMembershipResponse._id);
		}));

		it('$scope.update() should update a valid Membership', inject(function(Memberships) {
			// Define a sample Membership put data
			var sampleMembershipPutData = new Memberships({
				_id: '525cf20451979dea2c000001',
				name: 'New Membership'
			});

			// Mock Membership in scope
			scope.membership = sampleMembershipPutData;

			// Set PUT response
			$httpBackend.expectPUT(/memberships\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/memberships/' + sampleMembershipPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid membershipId and remove the Membership from the scope', inject(function(Memberships) {
			// Create new Membership object
			var sampleMembership = new Memberships({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Memberships array and include the Membership
			scope.memberships = [sampleMembership];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/memberships\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleMembership);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.memberships.length).toBe(0);
		}));
	});
}());