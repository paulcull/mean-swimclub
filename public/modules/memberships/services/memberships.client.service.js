'use strict';

//Memberships service used to communicate Memberships REST endpoints
angular.module('memberships').factory('Memberships', ['$resource', function($resource) {
    return $resource('memberships/:membershipId', {
        membershipId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);