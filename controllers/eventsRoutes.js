const router = require('express').Router();
const withAuth = require('../utils/auth');
const { Category, Event, Participants, User } = require('../models');

// ----------- Dashboard Main ---------------
router.get('/', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      //  include: [{ model: Event }],
    });
    const user = userData.get({ plain: true });
    res.render('dashboard', {
      ...user,
      name: req.user.username,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// ----------- New Event ---------------
router.get('/newevent', withAuth, (req, res) => {
  try {
    if (req.session.logged_in) {
      res.render('newEvent', {});
      return;
    }
    res.redirect('/dashboard');
  } catch (error) {
    res.status(500).json(error);
  }
});

// ----------- Edit Event ---------------
router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const eventData = await Event.findByPk(req.params.id, {
      //include: [{ model: Participants }],
    });
    const event = eventData.get({ plain: true });
    res.render('edit', {
      event,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
