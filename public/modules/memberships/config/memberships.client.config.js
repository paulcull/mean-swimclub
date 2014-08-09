'use strict';

// Configuring the Articles module
angular.module('memberships').run(['Menus',
	function(Menus) {
		// Set top bar menu items
        Menus.addMenuItem('topbar', 'Memberships', 'memberships', 'dropdown', '/memberships(/create)?');
        Menus.addSubMenuItem('topbar', 'memberships', 'List Memberships', 'memberships');
        Menus.addSubMenuItem('topbar', 'memberships', 'New Membership', 'memberships/create');
	}
]);