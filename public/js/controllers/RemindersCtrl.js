angular.module('RemindersCtrl', [])

  .controller('RemindersController', function() {
    var remindersList = this;
    remindersList.reminders = [
      {text:'Class Pictures', done:false},
      {text:'Field Trip', done:true}];

    remindersList.addReminder = function() {
      remindersList.reminders.push({text:remindersList.reminderText, done:false});
      remindersList.reminderText = '';
    };

    remindersList.remaining = function() {
      var count = 0;
      angular.forEach(remindersList.reminders, function(reminder) {
        count += reminder.done ? 0 : 1;
      });
      return count;
    };

    remindersList.archive = function() {
      var oldReminders = remindersList.reminders;
      remindersList.reminders = [];
      angular.forEach(oldReminders, function(reminder) {
        if (!reminder.done) remindersList.reminders.push(reminder);
      });
    };
  });





// From Angular editable list example-- return to this later

// 	.controller('RemindersListController', function(reminders) {
//   var remindersList = this;
//   remindersList.reminders = reminders;
// })
//
// .controller('NewReminderController', function($location, reminders) {
//   var editReminder = this;
//   editReminder.save = function() {
//       reminders.$add(editReminder.reminder).then(function(data) {
//           $location.path('/newReminder');
//       });
//   };
// })
//
// .controller('EditReminderController',
//   function($location, $routeParams, reminders) {
//     var editReminder = this;
//     var reminderId = $routeParams.reminderId,
//         reminderIndex;
//
//     editReminder.reminders = reminders;
//     reminderIndex = editReminder.reminders.$indexFor(reminderId);
//     editReminder.reminder = editReminder.reminders[reminderIndex];
//
//     editReminder.destroy = function() {
//         editReminder.reminders.$remove(editReminder.reminder).then(function(data) {
//             $location.path('/');
//         });
//     };
//
//     editReminder.save = function() {
//         editReminder.reminders.$save(editReminder.reminder).then(function(data) {
//            $location.path('/');
//         });
//     };
// });




	// // inject the service factory into our controller
	// .controller('RemindersController', ['$scope','$http','Reminders', function($scope, $http, Reminders) {
	// 	$scope.formData = {};
	// 	$scope.loading = true;
  //   $scope.tagline = "This is the reminders controller!";
	//
	// 	// GET =====================================================================
	// 	// when landing on the page, get all todos and show them
	// 	// use the service to get all the todos
	//
  //   // Reminders.get()
	// 	// 	.success(function(data) {
	// 	// 		$scope.reminders = data;
	// 	// 		$scope.loading = false;
	// 	// 	});
	//
  //     $http.get('/api/reminders')
  //       .success(function(data) {
  //         $scope.reminders = data;
  //       })
  //       .error(function(data) {
  //         console.log('Error: ' + data);
  //       });
	//
	// 	// CREATE ==================================================================
	// 	// when submitting the add form, send the text to the node API
	//
  // 	// $scope.createReminder = function() {
  //   //
	// 	// 	// validate the formData to make sure that something is there
	// 	// 	// if form is empty, nothing will happen
	// 	// 	if ($scope.formData.text != undefined) {
	// 	// 		$scope.loading = true;
  //   //
	// 	// 		// call the create function from our service (returns a promise object)
	// 	// 		Reminders.create($scope.formData)
  //   //
	// 	// 			// if successful creation, call our get function to get all the new todos
	// 	// 			.success(function(data) {
	// 	// 				$scope.loading = false;
	// 	// 				$scope.formData = {}; // clear the form so our user is ready to enter another
	// 	// 				$scope.reminders = data; // assign our new list of todos
	// 	// 			});
	// 	// 	}
	// 	// };
	//
	//
  //     $scope.createReminder = function() {
  //       $http.post('/api/reminders', $scope.formData)
  //         .success(function(data) {
  //           $scope.formData = {}; // clear the form so user is ready to enter another
  //           $scope.reminders = data;
  //         })
  //         .error(function(data) {
  //           console.log('Error: ' + data);
  //         });
  //     };
	//
	//
	// 	// DELETE ==================================================================
	// 	// delete a todo after checking it
	//
  //   // $scope.deleteReminder = function(id) {
	// 	// 	$scope.loading = true;
  //   //
	// 	// 	Reminders.delete(id)
	// 	// 		// if successful creation, call our get function to get all the new todos
	// 	// 		.success(function(data) {
	// 	// 			$scope.loading = false;
	// 	// 			$scope.reminders = data; // assign our new list of todos
	// 	// 		});
	// 	// };
	//
  //   $scope.deleteReminder = function(id) {
  //     $http.delete('/api/reminders/' + id)
  //       .success(function(data) {
  //         $scope.reminders = data;
  //       })
  //       .error(function(data) {
  //         console.log('Error: ' + data);
  //       });
  //   };
	//
	//
	// }]);
