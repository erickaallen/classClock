angular.module('appRoutes', [])
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

  // from Angular example
  var resolveReminders = {
    reminders: function (Reminders) {
      return Reminders.fetch();
    }
  };

  $routeProvider

      // home page
      .when('/', {
          templateUrl: 'views/home.html',
          controller: 'HomeController'
      })

      .when('/manage', {
          templateUrl:  'views/manage.html',
          controller:   'ManageController'
      })

      .when('/reminders', {
          templateUrl:  'views/reminders.html',
          controller:   'RemindersController'
      })

      .when('/students', {
          templateUrl:  'views/students.html',
          controller:   'StudentsController'
      })

      .when('/live', {
          templateUrl:  'views/live.html',
          controller:   'LiveController'
      })

      .when('/admin', {
          redirectTo:'/'
      })

      .when('/users', {
          redirectTo:'/'
      });

      // from Angular editable list example-- return to this later
      // .when('/remindersList', {
      //   controller:'RemindersListController as remindersList',
      //   templateUrl:'remindersList.html',
      //   resolve: resolveReminders
      // })
      // .when('/editReminder/:reminderId', {
      //   controller:'EditReminderController as editReminder',
      //   templateUrl:'remindersDetail.html',
      //   resolve: resolveReminders
      // })
      // .when('/newReminder', {
      //   controller:'NewReminderController as editReminder',
      //   templateUrl:'remindersDetail.html',
      //   resolve: resolveReminders
      // })
      // .otherwise({
      //   redirectTo:'/'
      // });

  $locationProvider.html5Mode(true);

}]);
