// This will be the Students Service.
angular.module('StudentsService', [])

// each function returns a promise object
// .service, .factory, and .provider can all be used to declare a service, but there are differences

	.factory('Students', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/students');
			},
			create : function(studentData) {
				return $http.post('/api/students', studentData);
			},
			delete : function(id) {
				return $http.delete('/api/students/:' + id);
			}
		}
	}]);
