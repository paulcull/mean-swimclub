'use strict';

(function() {
	// Entities Controller Spec
	describe('Entities Controller Tests', function() {
		// Initialize global variables
		var EntitiesController,
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

			// Initialize the Entities controller.
			EntitiesController = $controller('EntitiesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Entity object fetched from XHR', inject(function(Entities) {
			// Create sample Entity using the Entities service
			var sampleEntity = new Entities({
				name: 'New Entity'
			});

			// Create a sample Entities array that includes the new Entity
			var sampleEntities = [sampleEntity];

			// Set GET response
			$httpBackend.expectGET('entities').respond(sampleEntities);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.entities).toEqualData(sampleEntities);
		}));

		it('$scope.findOne() should create an array with one Entity object fetched from XHR using a entityId URL parameter', inject(function(Entities) {
			// Define a sample Entity object
			var sampleEntity = new Entities({
				name: 'New Entity'
			});

			// Set the URL parameter
			$stateParams.entityId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/entities\/([0-9a-fA-F]{24})$/).respond(sampleEntity);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.entity).toEqualData(sampleEntity);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Entities) {
			// Create a sample Entity object
			var sampleEntityPostData = new Entities({
				name: 'New Entity'
			});

			// Create a sample Entity response
			var sampleEntityResponse = new Entities({
				_id: '525cf20451979dea2c000001',
				name: 'New Entity'
			});

			// Fixture mock form input values
			scope.name = 'New Entity';

			// Set POST response
			$httpBackend.expectPOST('entities', sampleEntityPostData).respond(sampleEntityResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Entity was created
			expect($location.path()).toBe('/entities/' + sampleEntityResponse._id);
		}));

		it('$scope.update() should update a valid Entity', inject(function(Entities) {
			// Define a sample Entity put data
			var sampleEntityPutData = new Entities({
				_id: '525cf20451979dea2c000001',
				name: 'New Entity'
			});

			// Mock Entity in scope
			scope.entity = sampleEntityPutData;

			// Set PUT response
			$httpBackend.expectPUT(/entities\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/entities/' + sampleEntityPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid entityId and remove the Entity from the scope', inject(function(Entities) {
			// Create new Entity object
			var sampleEntity = new Entities({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Entities array and include the Entity
			scope.entities = [sampleEntity];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/entities\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleEntity);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.entities.length).toBe(0);
		}));
	});
}());