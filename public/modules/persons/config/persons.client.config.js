'use strict';

// Configuring the Articles module
angular.module('persons').run(['Menus',
	function(Menus) {
		// Set top bar menu items
        Menus.addMenuItem('topbar', 'Persons', 'persons', 'dropdown', '/persons(/create)?');
        Menus.addSubMenuItem('topbar', 'persons', 'List Persons', 'persons');
        Menus.addSubMenuItem('topbar', 'persons', 'New Person', 'persons/create');
   	}
]);