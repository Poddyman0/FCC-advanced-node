const passport = require('passport');
const bcrypt = require('bcrypt');

module.exports = function (app, myDataBase) {

  // Implement the Serialization of a Passport User
  app.route('/').get((req, res) => {
    res.render('index', {
      title: 'Connected to Database',
      message: 'Please login',
      showLogin: true,
      showRegistration: true,
      showSocialAuth: true
    });
  });

  // Passport authentication strategy for login
  app.route('/login').post(passport.authenticate('local', { failureRedirect: '/' }), (req, res) => {
    res.redirect('/chat');
  });

  // Middleware to ensure user is authenticated
  function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/');
  }

  // User profile route
  app.route('/profile').get(ensureAuthenticated, (req, res) => {
    res.render('profile', { username: req.user.username });
  });

  // Logout route
  app.route('/logout').get((req, res) => {
    req.logout();
    res.redirect('/');
  });

  // Registration route
  app.route('/register').post((req, res, next) => {
    const hash = bcrypt.hashSync(req.body.password, 12);
    console.log('Hashed password entered:', hash);

    // Check if user already exists
    myDataBase.findOne({ username: req.body.username }, (err, user) => {
      if (err) return next(err);
      if (user) return res.redirect('/');

      // If user doesn't exist, insert new user
      myDataBase.insertOne(
        {
          username: req.body.username,
          password: hash,
        },
        (err, doc) => {
          if (err) {
            return res.redirect('/');
          } else {
            next(null, doc.ops[0]);
          }
        }
      );
    });
  },
    passport.authenticate('local', { failureRedirect: '/' }),
    (req, res) => {
      res.redirect('/chat');
    }
  );

  // GitHub authentication routes
  app.route('/auth/github').get(passport.authenticate('github'));

  app.route('/auth/github/callback').get(
    passport.authenticate('github', { failureRedirect: '/' }),
    (req, res) => {
      req.session.user_id = req.user.id;
      res.redirect('/chat');
    }
  );

  // Chat route
  app.route('/chat').get(ensureAuthenticated, (req, res) => {
    res.render('chat', { username: req.user.username });
  });

  // Catch-all for undefined routes (404)

};
