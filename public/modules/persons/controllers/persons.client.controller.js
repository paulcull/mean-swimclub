'use strict';

// Persons controller
angular.module('persons').controller('PersonsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Persons',
    function($scope, $stateParams, $location, Authentication, Persons) {
        $scope.authentication = Authentication;

        // Create new Person
        $scope.create = function() {
        	// Create new Person object
            var person = new Persons({
                name: this.name
            });

            // Redirect after save
            person.$save(function(response) {
                $location.path('persons/' + response._id);
            }, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

            // Clear form fields
            this.name = '';
        };

        // Remove existing Person
        $scope.remove = function(person) {
            if (person) {
                person.$remove();

                for (var i in $scope.persons) {
                    if ($scope.persons[i] === person) {
                        $scope.persons.splice(i, 1);
                    }
                }
            } else {
                $scope.person.$remove(function() {
                    $location.path('persons');
                });
            }
        };

        // Update existing Person
        $scope.update = function() {
            var person = $scope.person;

            person.$update(function() {
                $location.path('persons/' + person._id);
            }, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
        };

        // Find a list of Persons
        $scope.find = function() {
            $scope.persons = Persons.query();
        };

        // Find existing Person
        $scope.findOne = function() {
            $scope.person = Persons.get({
                personId: $stateParams.personId
            });
        };
    }
]);