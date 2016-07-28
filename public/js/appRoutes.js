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

      .when('/manage', {
          templateUrl:  'views/pages/manage.html',
          // controller:   'ManageController'
      })

      .when('/reminders', {
          templateUrl:  'views/pages/reminders.html',
          controller:   'RemindersController',
          controllerAs: 'main'
      })
      
      .when('/live', {
          templateUrl:  'views/pages/live.html',
          // controller:   'LiveController'
      });

  $locationProvider.html5Mode(true);

});
