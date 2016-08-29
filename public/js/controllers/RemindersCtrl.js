angular.module('RemindersCtrl', ['ReminderService'])

    .controller('RemindersController', function(Reminder) {

      // bind this to vm (view-model)
      var vm = this;

      // define variables and objects on this
      // this lets them be available to our views

      // define a basic variable
      vm.message = 'View, edit, and delete your reminders';

      // set a processing variable to show loading
      vm.processing = true;

      // get all the reminders
      Reminder.all()

        // promise object
        .success(function(data) {

          // when all reminders come back, remove the processing variable
          vm.processing = false;

          // bind the data to a controller service
          // this comes from the ReminderService
          vm.reminders = data;
        });


      // function to delete a reminder
      vm.deleteReminder = function(id) {
        vm.processing = true;

        Reminder.delete(id)
            .success(function(data) {
                // get all reminders to update the table
                Reminder.all()
                    .success(function(data) {
                        vm.processing = false;
                        vm.reminders = data;
                    });
            });
      };
  })

  // controller applied to reminder creation page
  .controller('ReminderCreateController', function(Reminder) {

      var vm = this;

      // variable to hide/show elements of the view-model
      // differentiates between create or edit pages
      vm.type = 'create';

      // function to create a reminder
      vm.saveReminder = function() {
          vm.processing = true;
          vm.message = '';

          // use the create function in the ReminderService
          Reminder.create(vm.reminderData)
              .success(function(data) {
                  vm.processing = false;
                  vm.reminderData = {};
                  vm.message = data.message;
              });
      };
  })

  // controller applied to reminder edit page
  .controller('ReminderEditController', function($routeParams, Reminder) {

      var vm = this;

      // variable to hide/show elements of the view
      // differentiates between create or edit pages
      vm.type = 'edit';

      // get the reminder data for the reminder to edit
      // $routeParams is how we get data from the URL
      Reminder.get($routeParams.reminder_id)
          .success(function(data) {
              vm.reminderData = data;
          });

      // function to save the reminder
      vm.saveReminder = function() {
          vm.processing = true;
          vm.message = '';

          // call the ReminderService function to update
          Reminder.update($routeParams.reminder_id, vm.reminderData)
              .success(function(data) {
                  vm.processing = false;

                  // clear the form
                  vm.reminderData = {};

                  // bind the message from our API to vm.message
                  vm.message = data.message;
              });
      };
  });
