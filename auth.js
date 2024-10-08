require('dotenv').config();
const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');
const { ObjectID } = require('mongodb');
const GitHubStrategy = require('passport-github').Strategy;

module.exports = function (app, myDataBase) {
  // Serialization and deserialization of user object
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  
  passport.deserializeUser((id, done) => {
    myDataBase.findOne({ _id: new ObjectID(id) }, (err, doc) => {
      done(null, doc);
    });
  });
  
  // Passport authentication Strategies
  passport.use(new LocalStrategy(async (username, password, done) => {
    try {
      const hash = bcrypt.hashSync(password, 12);
      console.log("heshed password entered", hash)
      console.log("password 1:", password);
      console.log("username:", username);

      // Fetch the user from the database asynchronously
      const user = await myDataBase.findOne({ username: username });
      
      console.log("found user", user);

      if (!user) {
        console.log("User not found");
        return done(null, false); // No user found
      }

      console.log("password 2:", password);
      console.log("password 3 (user password):", user.password);

      // Compare the provided password with the stored hashed password
      if (!bcrypt.compareSync(password, user.password)) {
        console.log("Password does not match");
        return done(null, false); // Password mismatch
      }

      // Authentication successful
      return done(null, user);

    } catch (err) {
      console.error("Error during authentication:", err);
      return done(err);
    }
  }));

  // Implementation of Social Authentication II
  passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: 'https://fcc-advanced-node-production.up.railway.app/auth/github/callback'
  },
    function(accessToken, refreshToken, profile, cb) {
      console.log(profile);
      // Implementation of Social Authentication III
      myDataBase.findOneAndUpdate(
        { id: profile.id },
        {
          $setOnInsert: {
            id: profile.id,
            username: profile.username,
            name: profile.displayName || 'John Doe',
            photo: profile.photos[0].value || '',
            email: Array.isArray(profile.emails) ? profile.emails[0].value : 'No public email',
            created_on: new Date(),
            provider: profile.provider || ''
          },
          $set: { _login: new Date() },
          $inc: { login_count: 1 }
        },
        { upsert: true, new: true },
        (err, doc) => {
          return cb(null, doc.value);
        }
      );
    }
  ));
}
