// Will be deleting, only for example.

// angular.module('NerdCtrl', [])
//
//   // inject the Nerd service factory into our controller
//   .controller('NerdController', function($scope, $http, Nerds) {
//
//     $scope.tagline = 'Nothing beats a pocket protector!';
//
//     $scope.formData = {};
//
//     // GET:: when landing on the page, get all nerds and show them
//     // use the service to get all the nerds
//
//     $http.get('/api/nerds')
//       .success(function(data) {
//         $scope.nerds = data;
//       })
//       .error(function(data) {
//         console.log('Error: ' + data);
//       });
//
//     // Nerds.get()
//     //   .success(function(data) {
//     //     $scope.nerds = data;
//     //   });
//
//       // CREATE:: when submitting the add form, send the text to the node API
//
//       $scope.createNerd = function() {
//         $http.post('/api/nerds', $scope.formData)
//           .success(function(data) {
//             $scope.formData = {}; // clear the form so user is ready to enter another nerd
//             $scope.nerds = data;
//           })
//           .error(function(data) {
//             console.log('Error: ' + data);
//           });
//       };
//
//       // $scope.createNerd = function() {
//       //
//       //   // validate the formData to make sure that something is there
//       //   // if form is empty, nothing will happen
//       //   // users cannot just hold enter to keep adding the same data
//       //   if (!$.isEmptyObject($scope.formData)) {
//       //
//       //     // call the create function from our service (returns a promise object)
//       //     Nerds.create($scope.formData)
//       //
//       //       // if successful creation, call our get function to get all new nerds
//       //       .success(function(data) {
//       //         $scope.formData = {}; // clear the form so user is ready to enter another nerd
//       //         $scope.nerds = data; // assign our new list of nerds
//       //       });
//       //   };
//       // };
//
//
//       // DELETE:: delete a nerd after checking it
//
//       $scope.deleteNerd = function(id) {
//         $http.delete('/api/nerds/' + id)
//           .success(function(data) {
//             $scope.nerds = data;
//           })
//           .error(function(data) {
//             console.log('Error: ' + data);
//           });
//       };
//
//       // $scope.deleteNerd = function(id) {
//       //   Nerds.delete(id)
//       //     // if successful deletion, call our get function to get all current nerds
//       //     .success(function(data) {
//       //       $scope.nerds = data; // assign our new list of nerds
//       //     });
//       // };
//
// });
