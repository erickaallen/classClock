
angular.module('RemindersService', [])

// each function returns a promise object
// .service, .factory, and .provider can all be used to declare a service, but there are differences

	.factory('Reminders', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/reminders');
			},
			create : function(reminderData) {
				return $http.post('/api/reminders', reminderData);
			},
			delete : function(id) {
				return $http.delete('/api/reminders/:' + id);
			}
		}
	}]);
