angular.module('appRoutes', ['ngRoute'])
.config(function($routeProvider, $locationProvider) {

  $routeProvider

      .when('/', {
          templateUrl: 'views/pages/home.html',
          controller: 'MainController',
          controllerAs: 'main'
      })

      .when('/login', {
          templateUrl: 'views/pages/login.html',
          controller: 'MainController',
          controllerAs: 'login'
      })

      // show all users
      .when('/users', {
          templateUrl:'views/pages/users/all.html',
          controller: 'UserController',
          controllerAs: 'user'
      })

      // page to create a new user
      // same view as edit page
      .when('/users/create', {
          templateUrl:'views/pages/users/single.html',
          controller: 'UserCreateController',
          controllerAs: 'user'
      })

      // page to edit a user
      .when('/users/:user_id', {
          templateUrl:'views/pages/users/single.html',
          controller: 'UserEditController',
          controllerAs: 'user'
      })

      // show all reminders
      .when('/reminders', {
          templateUrl:  'views/pages/reminders/all.html',
          controller:   'RemindersController',
          controllerAs: 'reminder'
      })

      // page to create a new reminder
      // same view as edit page
      .when('/reminders/create', {
          templateUrl:'views/pages/reminders/single.html',
          controller: 'ReminderCreateController',
          controllerAs: 'reminder'
      })

      // page to edit a reminder
      .when('/reminders/:reminder_id', {
          templateUrl:'views/pages/reminders/single.html',
          controller: 'ReminderEditController',
          controllerAs: 'reminder'
      })

      .when('/live', {
          templateUrl:  'views/pages/live.html',
      });

  $locationProvider.html5Mode(true);

});
