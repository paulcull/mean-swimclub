'use strict';

// Configuring the Articles module
angular.module('entities').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Entities', 'entities', 'dropdown', '/entities/(/create)?');
        Menus.addSubMenuItem('topbar', 'entities', 'List Entities', 'entities');
        Menus.addSubMenuItem('topbar', 'entities', 'New Entities', 'entities/create');
	}
]);