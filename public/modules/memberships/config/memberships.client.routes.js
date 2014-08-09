'use strict';

//Setting up route
angular.module('memberships').config(['$stateProvider',
	function($stateProvider) {
		// Memberships state routing
		$stateProvider.
		state('listMemberships', {
			url: '/memberships',
			templateUrl: 'modules/memberships/views/list-memberships.client.view.html'
		}).
		state('createMembership', {
			url: '/memberships/create',
			templateUrl: 'modules/memberships/views/create-membership.client.view.html'
		}).
		state('viewMembership', {
			url: '/memberships/:membershipId',
			templateUrl: 'modules/memberships/views/view-membership.client.view.html'
		}).
		state('editMembership', {
			url: '/memberships/:membershipId/edit',
			templateUrl: 'modules/memberships/views/edit-membership.client.view.html'
		});
	}
]);