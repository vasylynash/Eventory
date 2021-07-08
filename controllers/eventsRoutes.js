const router = require('express').Router();
const withAuth = require('../utils/auth');
const { Category, Event, Participants, User } = require('../models');

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
    const eventData = await Event.findByPk(req.params.id
      // , {
      //include: [{ model: Participants }],
    // }
    );
    const event = eventData.get({ plain: true });
    res.render('edit', {
      event,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
