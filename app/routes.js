// CRUD and API routes should be handled here also
var express = require('express'),
        app = express(),
adminRouter = express.Router(),
      path  = require('path'),
bodyParser  = require('body-parser'),         // pull information from HTML POST (express4)
    morgan  = require('morgan'),             // log requests to the console (express4)
  database  = require('../config/database'),   // load the db config
       jwt  = require('jsonwebtoken'),
superSecret = 'thisappisgonnabeawesome';



// load the models we created
var User      = require('./models/user'),
    Reminder  = require('./models/reminder'),
    Student   = require('./models/student');

// expose the routes to our app with module.exports
module.exports = function (app, express) {

  var express = require('express');

  /////////////////////
  // frontend routes //
  /////////////////////

  ////// route to handle angular requests //////

  // basic route for the home page
  app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html')); // load our public/index.html file, angular will handle page changes on the frontend
  });

  ///////////////////
  // server routes //
  ///////////////////

  // get an instance of the express router
  var apiRouter = express.Router();

  // route to generate a sample user
  apiRouter.post('/sample', function(req, res) {

      // look for the user named test
      User.findOne({ 'username': 'test' }, function(err, user) {

          // if there is no test user, create one
          if (!user) {
              var sampleUser = new User();

              sampleUser.name = 'Test';
              sampleUser.username = 'test';
              sampleUser.password = 'password';

              sampleUser.save();
          } else {
              console.log(user);

              // if there is a test, update her password
              user.password = 'password';
              user.save();
          }
      });
  });


  // route for authenticating users (POST localhost:3000/api/authenticate)
  apiRouter.post('/authenticate', function(req, res) {

      // find the user
      // select the name, username, and password explicitly
      User.findOne({
        username: req.body.username
      }).select('name username password').exec(function(err, user) {
        if (err) throw err;

        // no user with that username was found
        if (!user) {
          res.json({
            success: false,
            message: 'Authentication failed. User not found.'
          });
        } else if (user) {

          // check if password matches
          var validPassword = user.comparePassword(req.body.password);
          if (!validPassword) {
            res.json({
              success: false,
              message: 'Authentication failed. Wrong password.'
            });
          } else {

            // if user is found and password is right
            // create a token
            var token = jwt.sign({
              name: user.name,
              username: user.username
            }, superSecret, {
              expiresIn: '24h' // expires in 24 hours
            });

            // return the information including token as JSON
            res.json({
              success: true,
              message: 'Enjoy your token!',
              token: token
            });
          }
        }
      });
  });


  // route middleware to verify token for all requests
  apiRouter.use(function(req, res, next) {

    // log visitor
    console.log('Somebody just came to our app!');

    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {

      // verifies secret and checks exp
      jwt.verify(token, superSecret, function(err, decoded) {
        if (err) {
          return res.status(403).send({
            success: false,
            message: 'Failed to authenticate token.'
          });
        } else {

          // if everything is good, save to request for use in other routes
          req.decoded = decoded;
          next(); // go to the next routes and don't stop here
        }
      });
    } else {

      // if there is no token
      // return an HTTP response of 403 (access forbidden) and an error message
      return res.status(403).send({
        success: false,
        message: 'No token provided.'
      });
    }
  });

  // other api routes (the authenticated routes)
  // testing to make sure it's working (GET localhost:3000/api)
  apiRouter.get('/', function(req, res) {
    res.json({ message: 'yay! welcome to our api!'});
  });

  ////// CRUD for /users //////

  apiRouter.route('/users')

    // create a user (POST localhost:3000/api/users)
    .post(function(req, res) {

        // create a new instance of the User model
        var user = new User();

        // set the users information (comes from the request)
        user.name = req.body.name;
        user.username = req.body.username;
        user.password = req.body.password;

        // save the user and check for errors
        user.save(function(err) {
            if (err) {
                // duplicate entry
                if (err.code == 11000)
                    return res.json({ success: false, message: 'A user with that username already exists. ' });
                else
                    return res.send(err);
            }

            // return message
            res.json({ message: 'User created!' });
        });
    })

    // get all the users (accessed at GET localhost:3000/api/users)
    .get(function(req, res) {
        User.find(function(err, users) {
            if (err) res.send(err);

            // return the users
            res.json(users);
        });
    });


    apiRouter.route('/users/:user_id')

        // get the user with that id (GET localhost:3000/api/users/:user_id)
        .get(function(req, res) {
            User.findById(req.params.user_id, function(err, user) {
                  if (err) return res.send(err);

                  // return that user
                  res.json(user);
            });
        })

        // update the user with this id
        .put(function(req, res) {
            User.findById(req.params.user_id, function(err, user) {
                if (err) return res.send(err);

                // set new user information if it exists in the request
                // do not save to db if blank/not changed
                if (req.body.name) user.name = req.body.name;
			          if (req.body.username) user.username = req.body.username;
			          if (req.body.password) user.password = req.body.password;

                // save the user
                user.save(function(err) {
                    if (err) return res.send(err);

                    // return a message
                    res.json({ message: 'User updated!' });
                });
            });
        })

        // delete the user with this id
        .delete(function(req, res) {
            User.remove({
              _id: req.params.user_id
            }, function(err, user) {
                if (err) return res.send(err);

                res.json({ message: 'Successfully deleted!' });
            });
        });





  ////// CRUD for /reminders //////

  apiRouter.route('/reminders')

    // create a reminder (accessed at POST localhost:3000/api/reminders)
    .post(function(req, res) {

        // create a new instance of the Reminder model
        var reminder = new Reminder();

        // set the reminder information (comes from the request)
        reminder.eventName = req.body.eventName;
        reminder.studentNames = req.body.studentNames;
        reminder.date = req.body.date;
        reminder.note = req.body.note;


        // save the reminder and check for errors
        reminder.save(function(err) {
            if (err) return res.send(err);

            // return message
            res.json({ message: 'Reminder created!' });
        });
    })

    // get all the reminders (accessed at GET localhost:3000/api/reminders)
    .get(function(req, res) {
        Reminder.find(function(err, reminders) {
            if (err) res.send(err);

            // return the reminders
            res.json(reminders);
        });
    });


    apiRouter.route('/reminders/:reminder_id')

        // get the reminder with that id (accessed at GET localhost:3000/api/reminders/:reminder_id)
        .get(function(req, res) {
            Reminder.findById(req.params.reminder_id, function(err, reminder) {
                  if (err) return res.send(err);

                  // return that reminder
                  res.json(reminder);
            });
        })

        // update the reminder with this id
        .put(function(req, res) {
            Reminder.findById(req.params.reminder_id, function(err, reminder) {
                if (err) return res.send(err);

                // set new reminder information if it exists in the request
                // do not save to db if blank/not changed
                if (req.body.eventName) reminder.eventName = req.body.eventName;
			          if (req.body.studentNames) reminder.studentNames = req.body.studentNames;
			          if (req.body.date) reminder.date = req.body.date;
                if (req.body.note) reminder.note = req.body.note;

                // save the reminder
                reminder.save(function(err) {
                    if (err) return res.send(err);

                    // return a message
                    res.json({ message: 'Reminder updated!' });
                });
            });
        })

        // delete the reminder with this id
        .delete(function(req, res) {
            Reminder.remove({
              _id: req.params.reminder_id
            }, function(err, reminder) {
                if (err) return res.send(err);

                res.json({ message: 'Successfully deleted!' });
            });
        });






////// CRUD for /students //////

apiRouter.route('/students')

  // create a student (accessed at POST localhost:3000/api/students)
  .post(function(req, res) {

      // create a new instance of the Student model
      var student = new Student();

      // set the students information (comes from the request)
      student.name = req.body.name;
      student.groups = req.body.groups;
      student.reminders = req.body.reminders;
      student.note = req.body.note;


      // save the student and check for errors
      student.save(function(err) {
          if (err) {
              // duplicate entry
              if (err.code == 11000)
                  return res.json({ success: false, message: 'A student with that name already exists. ' });
              else
                  return res.send(err);
          }

          // return message
          res.json({ message: 'Student created!' });
      });
  })

  // get all the students (accessed at GET localhost:3000/api/students)
  .get(function(req, res) {
      Student.find(function(err, students) {
          if (err) res.send(err);

          // return the students
          res.json(students);
      });
  });


  apiRouter.route('/students/:student_id')

      // get the student with that id (accessed at GET localhost:3000/api/students/:student_id)
      .get(function(req, res) {
          Student.findById(req.params.student_id, function(err, student) {
                if (err) return res.send(err);

                // return that user
                res.json(student);
          });
      })

      // update the user with this id
      .put(function(req, res) {
          Student.findById(req.params.student_id, function(err, student) {
              if (err) return res.send(err);

              // set new student information if it exists in the request
              // do not save to db if blank/not changed
              if (req.body.name) student.name = req.body.name;
              if (req.body.groups) student.groups = req.body.groups;
              if (req.body.reminders) student.reminders = req.body.reminders;
              if (req.body.note) student.note = req.body.note;

              // save the user
              student.save(function(err) {
                  if (err) return res.send(err);

                  // return a message
                  res.json({ message: 'Student updated!' });
              });
          });
      })

      // delete the user with this id
      .delete(function(req, res) {
          Student.remove({
            _id: req.params.student_id
          }, function(err, student) {
              if (err) return res.send(err);

              res.json({ message: 'Successfully deleted!' });
          });
      });

  // api endpoint to get user information
  apiRouter.get('/me', function(req, res) {
    res.send(req.decoded);
  });


  app.use('/api', apiRouter);


  ////// routes for the admin section //////

  // middleware to log requests to the terminal
  adminRouter.use(function(req, res, next) {
    // log each request to the console
    console.log(req.method, req.url);
    // continue doing what we were doing and go to the route
    next();
  });

  // admin main page. the dashboard (localhost:3000/admin)
  adminRouter.get('/', function(req, res) {
    res.send('I am the dashboard!');
  });

  // users page (localhost:3000/admin/users)
  adminRouter.get('/users', function(req, res) {
    res.send('I show all the users!');
  });

  // posts page (localhost:3000/admin/posts)
  adminRouter.get('/posts', function(req, res) {
    res.send('I show all the posts!');
  });

  // apply the routes to the application
  app.use('/admin', adminRouter);


} // closes module.exports
