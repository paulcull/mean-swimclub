'use strict';

//Setting up route
angular.module('entities').config(['$stateProvider',
	function($stateProvider) {
		// Entities state routing
		$stateProvider.
		state('listEntities', {
			url: '/entities',
			templateUrl: 'modules/entities/views/list-entities.client.view.html'
		}).
		state('createEntity', {
			url: '/entities/create',
			templateUrl: 'modules/entities/views/create-entity.client.view.html'
		}).
		state('viewEntity', {
			url: '/entities/:entityId',
			templateUrl: 'modules/entities/views/view-entity.client.view.html'
		}).
		state('editEntity', {
			url: '/entities/:entityId/edit',
			templateUrl: 'modules/entities/views/edit-entity.client.view.html'
		});
	}
]);