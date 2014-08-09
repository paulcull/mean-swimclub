'use strict';

// Memberships controller
angular.module('memberships').controller('MembershipsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Memberships',
    function($scope, $stateParams, $location, Authentication, Memberships) {
        $scope.authentication = Authentication;

        // Create new Membership
        $scope.create = function() {
        	// Create new Membership object
            var membership = new Memberships({
                name: this.name
            });

            // Redirect after save
            membership.$save(function(response) {
                $location.path('memberships/' + response._id);
            }, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

            // Clear form fields
            this.name = '';
        };

        // Remove existing Membership
        $scope.remove = function(membership) {
            if (membership) {
                membership.$remove();

                for (var i in $scope.memberships) {
                    if ($scope.memberships[i] === membership) {
                        $scope.memberships.splice(i, 1);
                    }
                }
            } else {
                $scope.membership.$remove(function() {
                    $location.path('memberships');
                });
            }
        };

        // Update existing Membership
        $scope.update = function() {
            var membership = $scope.membership;

            membership.$update(function() {
                $location.path('memberships/' + membership._id);
            }, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
        };

        // Find a list of Memberships
        $scope.find = function() {
            $scope.memberships = Memberships.query();
        };

        // Find existing Membership
        $scope.findOne = function() {
            $scope.membership = Memberships.get({
                membershipId: $stateParams.membershipId
            });
        };
    }
]);