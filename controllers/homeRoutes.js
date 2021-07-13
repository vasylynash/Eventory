const router = require('express').Router();
const { Event, User, Participants } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async function (req, res) {
  try {
  const eventData = await Event.findAll({
    include: [
      {
        model: User,
        attributes: ['username'],
      },
      {
        model: User,
        as: 'participant',
        attributes: ['username']
      }
    ]
  });

  const events = eventData.map((el) => el.get({ plain: true, nested: true })); 
  res.render('all',{
    events
  });
  }
  catch (e) {
    res.json(e);
  }
});

router.get('/dashboard', withAuth, async function (req, res) {
  try {
  const eventData = await Event.findAll({
    where: {
      owner_id: req.user.id,
    },
    include: [
      {
        model: User,
        attributes: ['username']
      }
    ]
  });

  const events = eventData.map((el) => el.get({ plain: true }));

  const joinedEventsData = await req.user.getJoined({
    include: [
      {
        model: User,
        attributes: ['username']
      }
    ]
  });
  const joinedEvents = joinedEventsData.map((el) => el.get({ plain: true }));

  res.render('userCardsAll',{
    events,
    joinedEvents
  });
  }
  catch(e) {
    res.json(e);
  }
});

module.exports = router;
