
angular.module('ReminderService', [])

// each function returns a promise object
// .service, .factory, and .provider can all be used to declare a service, but there are differences

	.factory('Reminder', function($http) {

		// create a new object
		var reminderFactory = {};

		// get a single reminder
		reminderFactory.get = function(id) {
			return $http.get('/api/reminders/' + id);
		};

		// get all reminders for the logged in user
		reminderFactory.all = function() {
			return $http.get('/api/reminders/');
		};

		// create a reminder
		reminderFactory.create = function(reminderData) {
			return $http.post('/api/reminders/', reminderData);
		};

		// update a reminder
		reminderFactory.update = function(id, reminderData) {
			return $http.put('/api/reminders/' + id, reminderData);
		};

		// delete a reminder
		reminderFactory.delete = function(id) {
			return $http.delete('/api/reminders/' + id);
		};

		// return our entire remindersFactory object
		return reminderFactory;
	});
