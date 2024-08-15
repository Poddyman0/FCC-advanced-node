const passport = require('passport');
const bcrypt = require('bcrypt');

module.exports = function (app, myDataBase) {

  //Implement the Serialization of a Passport User
  app.route('/').get((req, res) => {
    // render variables with pub templates
    res.render('index', {
      title: 'Connected to Database',
      message: 'Please login',
      showLogin: true,
      showRegistration: true,
      showSocialAuth: true
    });
  });


  //How to Use Passport authentication Strategies middleware
  app.route('/login').post(passport.authenticate("local", {failureRedirect: "/"}), (req, res) => {
    res.redirect('/profile')
  })
  // creation of new middleware to ensure user is authenticated with passport
  function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/');
  };
  // creation of new middleware to ensure user is authenticated with passport

  app.route('/profile').get(ensureAuthenticated, (req, res) => {
    res.render('profile', {username: req.user.username})
  })
  // loggin out a user
  app.route('/logout').get((req, res) => {
    req.logout();
    res.redirect('/');

    app.use((req, res, next) => {
      res.status(404)
        .type('text')
        .send('Not Found');
    });

    app.route('/register')
    .post((req, res, next) => {
        //hashing passwords on registration

      const hash = bcrypt.hashSync(req.body.password, 12);
      //query database
      myDataBase.findOne({ username: req.body.username }, (err, user) => {

        //If there is an error, call next with the error
        if (err) {
          next(err);
        } //If a user is returned, redirect back to home
        else if (user) {
        
          res.redirect('/');
        } 
        //if a user is not found and no errors occur, then insertOne into the database with the username and password. 
        else {
          myDataBase.insertOne({
            username: req.body.username,
            //hashed passwords
            password: hash
          },
            (err, doc) => {
              if (err) {
                res.redirect('/');
              } //As long as no errors occur there, call next to go to call next error
              else {
                // The inserted document is held within
                // the ops property of the doc
                next(null, doc.ops[0]);
              }
            }
          )
        }
      })
    },
      passport.authenticate('local', { failureRedirect: '/' }),
      (req, res, next) => {
        res.redirect('/profile');
      }
    );
});

//Implementation of Social Authentication

app.route('/auth/github').get(passport.authenticate("github"), (req, res) => {

})

app.route('/auth/github/callback').get(passport.authenticate("github", {failureRedirect: "/"}), (req, res) => {
  req.session.user_id = req.user.id
  res.redirect('/chat')
})

app.route('/chat').get(ensureAuthenticated, (req, res) => {
  res.render('chat', {
    user: req.user
  })
})

//leave below
}