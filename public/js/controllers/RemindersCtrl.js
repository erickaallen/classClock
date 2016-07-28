angular.module('RemindersCtrl', ['ReminderService'])

    .controller('RemindersController', function(Reminder) {

      // bind this to vm (view-model)
      var vm = this;

      // define variables and objects on this
      // this lets them be available to our views

      // define a basic variable
      vm.message = 'View, edit, and delete your reminders';

      // get all the reminders
      Reminder.all()

        // promise object
        .success(function(data) {

          // bind the data to a controller service
          // this comes from the RemindersService
          vm.reminders = data;
        });

      // information that comes from our reminder form
      vm.reminderData = {};

      vm.addReminder = function() {

        // add a reminder to the list
        vm.reminders.push({
          date: vm.reminderData.date,
          eventName: vm.reminderData.eventName,
          studentNames: vm.reminderData.studentNames,
          note: vm.reminderData.note
        });

        // after our reminder has been added, clear the form
        vm.reminderData = {};
      };
    });
