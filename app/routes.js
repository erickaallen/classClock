// CRUD and API routes should be handled here also
var express = require('express'),
        app = express();
  apiRouter = express.Router(),
adminRouter = express.Router(),
      path  = require('path');

// load the model we created
var Reminder = require('./models/reminder');

function getReminders(res) {
  Reminder.find(function (err, reminders) {

    // if error retrieving, send error. Nothing after res.send(err) will execute.
    if (err) {
      res.send(err);
    }
    res.json(reminders); // return all reminders in JSON format
  });
};

// expose the routes to our app with module.exports
module.exports = function (app) {

  ///////////////////
  // server routes //
  ///////////////////

  ////// login route //////

  app.route('/login')

    // show the form (GET localhost:3000/login)
    .get(function(req, res) {
      res.send('this is the login form');
    })

    // process the form (POST localhost:3000/login)
    .post(function(req,res) {
      console.log('processing');
      res.send('processing the login form!');
    });

  ////// routes for the api //////

  apiRouter.use(function(req,res, next) {
    // do logging
    console.log('Somebody just came to our app!');
    // this is where we will authenticate users later
    next(); // make sure we go to the next routes and don't stop here
  });

  apiRouter.get('/', function(req, res) {
    res.json({ message: 'yay! welcome to our api!'});
  });

  // get all reminders (READ)
  app.get('/api/reminders', function (req, res) {
      getReminders(res);
  });

  // create reminder and send back all reminders after creation (CREATE)
  app.post('/api/reminders', function(req, res) {
      Reminder.create({
        text: req.body.text,
        done: false
      }, function (err, reminder) {
        if (err)
            res.send(err);

        // get and return all reminders after you create another
        getReminders(res);
      });
  });

  // TODO:: Still need route to edit reminders

  // delete a reminder (DELETE)
  app.delete('/api/reminders/:reminder_id', function(req, res) {
      Reminder.remove({
        _id: req.params.reminder_id
      }, function (err, reminder) {
        if (err)
            res.send(err);

        getReminders(res);
      });
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



  /////////////////////
  // frontend routes //
  /////////////////////

  ////// route to handle angular requests //////

  app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html')); // load our public/index.html file, angular will handle page changes on the frontend
  });


};
