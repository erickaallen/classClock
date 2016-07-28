angular.module('classclock', ['ngRoute', 'appRoutes', 'ds.clock', 'MainCtrl', 'HomeCtrl', 'ManageCtrl', 'RemindersCtrl', 'LiveCtrl', 'UserCtrl', 'StudentsCtrl', 'ReminderService', 'StudentService', 'UserService', 'AuthService'])

// application config to integrate token into requests
.config(function($httpProvider) {

    // attach our auth interceptor to the http requests
    $httpProvider.interceptors.push('AuthInterceptor');
});
