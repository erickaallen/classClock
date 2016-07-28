// This will be the Student Service.
angular.module('StudentService', [])

// each function returns a promise object
// .service, .factory, and .provider can all be used to declare a service, but there are differences

	.factory('Student', function($http) {

		// create a new object
		var studentFactory = {};

		// get a single student
		studentFactory.get = function(id) {
			return $http.get('/api/students/' + id);
		};

		// get all students
		studentFactory.all = function() {
			return $http.get('/api/students/');
		};

		// create a student
		studentFactory.create = function(studentData) {
			return $http.post('/api/students/', studentData);
		};

		// update a student
		studentFactory.update = function(id, studentData) {
			return $http.put('/api/students/' + id, studentData);
		};

		// delete a student
		studentFactory.delete = function(id) {
			return $http.delete('/api/students/' + id);
		};

		// return our entire studentFactory object
		return studentFactory;
	});
