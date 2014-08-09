'use strict';

// Entities controller
angular.module('entities').controller('EntitiesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Entities',
    function($scope, $stateParams, $location, Authentication, Entities) {
        $scope.authentication = Authentication;

        // Create new Entity
        $scope.create = function() {
        	// Create new Entity object
            var entity = new Entities({
                name: this.name
            });

            // Redirect after save
            entity.$save(function(response) {
                $location.path('entities/' + response._id);
            }, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

            // Clear form fields
            this.name = '';
        };

        // Remove existing Entity
        $scope.remove = function(entity) {
            if (entity) {
                entity.$remove();

                for (var i in $scope.entities) {
                    if ($scope.entities[i] === entity) {
                        $scope.entities.splice(i, 1);
                    }
                }
            } else {
                $scope.entity.$remove(function() {
                    $location.path('entities');
                });
            }
        };

        // Update existing Entity
        $scope.update = function() {
            var entity = $scope.entity;

            entity.$update(function() {
                $location.path('entities/' + entity._id);
            }, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
        };

        // Find a list of Entities
        $scope.find = function() {
            $scope.entities = Entities.query();
        };

        // Find existing Entity
        $scope.findOne = function() {
            $scope.entity = Entities.get({
                entityId: $stateParams.entityId
            });
        };
    }
]);