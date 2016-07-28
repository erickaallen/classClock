angular.module('UserService', [])

  .factory('User', function($http) {

    // create a new object
    var UserFactory = {};

    // get a single user
    UserFactory.get = function(id) {
      return $http.get('/api/users/' + id);
    };

    // get all users
    UserFactory.all = function() {
      return $http.get('/api/users/');
    };

    // create a user
    UserFactory.create = function(userData) {
      return $http.post('/api/users/', userData);
    };

    // update a user
    UserFactory.update = function(id, userData) {
      return $http.put('/api/users/' + id, userData);
    };

    // delete a user
    UserFactory.delete = function(id) {
      return $http.delete('/api/users/' + id);
    };

    // return our entire UserFactory object
    return UserFactory;

  });
