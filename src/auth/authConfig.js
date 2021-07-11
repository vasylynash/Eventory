const sequelize = require('../../config/connection');
const User = require('../../models/User');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Register a login strategy
passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async function (username, password, done) {
      const userData = await User.findOne({ where: { email: username } });
      if (!userData) {
        done(null, false, { message: 'Invalid username and password.' });
        return;
      }
      const user = userData.get({ plain: true });
      const validPassword = await userData.checkPassword(password);
      if (validPassword) {
        return done(null, user);
      } else {
        done(null, false, { message: 'Invalid username and password.' });
      }
    }
  )
);
// Signup
passport.use(
  'local-signup',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async function (req, email, password, done) {
      let user = await User.findOne({ where: { email: email } });
      if (user) {
        alert('Found user');
        return done(null, false);
      }
      let newUser = await User.create({
        email: email,
        password: password,
        username: req.body.username,
      });
      const currentUser = newUser.get({ plain: true });
      return done(null, { id: currentUser.id });
    }
  )
);

// Required for storing user info into session
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// Required for retrieving user from session
passport.deserializeUser(async function (id, done) {
  const user = await User.findByPk(id);
  done(null, user);
});

module.exports = passport;
