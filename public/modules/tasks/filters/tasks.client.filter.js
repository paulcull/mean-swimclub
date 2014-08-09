'use strict';

angular.module('tasks').filter('tasks', [
	function() {
		return function(input) {
			// Tasks directive logic 
			// ...

			return 'tasks filter: ' + input;
		};
	}
]);