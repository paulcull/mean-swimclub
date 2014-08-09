'use strict';

//Entities service used to communicate Entities REST endpoints
angular.module('entities').factory('Entities', ['$resource', function($resource) {
    return $resource('entities/:entityId', {
        entityId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);