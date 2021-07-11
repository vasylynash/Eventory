const router = require('express').Router();
const authConfig = require('../../src/auth/authConfig');
const { User } = require('../../models');

router.post(
  '/login',
  authConfig.authenticate('login', { successRedirect: '/' })
);

router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

router.post(
  '/',
  authConfig.authenticate('local-signup', {
    successRedirect: '/',
  })
  // async (req, res) => {
  //   // try {
  //   //   // const userData = await User.create({
  //   //   //   username: req.body.username,
  //   //   //   email: req.body.email,
  //   //   //   password: req.body.password,
  //   //   // });
  //   //   // req.session.save(() => {
  //   //   //   req.session.logged_email = userData.email;
  //   //   //   req.session.logged_name = userData.username;
  //   //   //   res.status(200).json(userData);
  //   //   // });
  //   // } catch (error) {
  //   //   res.status(400).json(error);
  //   // }
  // }
);

module.exports = router;
