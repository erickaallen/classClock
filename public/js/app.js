angular.module('classclock', ['ngRoute', 'appRoutes', 'ds.clock', 'MainCtrl', 'RemindersCtrl', 'UserCtrl', 'ReminderService', 'UserService', 'AuthService'])

// application config to integrate token into requests
.config(function($httpProvider) {

    // attach our auth interceptor to the http requests
    $httpProvider.interceptors.push('AuthInterceptor');
});
