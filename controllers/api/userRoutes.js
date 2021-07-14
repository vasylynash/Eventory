const router = require('express').Router();
const authConfig = require('../../src/auth/authConfig');
const { User, Participants } = require('../../models');
const withAuth = require('../../utils/auth');

router.post(
  '/login',
  authConfig.authenticate('login', { successRedirect: '/' })
);

router.post('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

router.post(
  '/',
  authConfig.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/login',
  })
);



module.exports = router;
