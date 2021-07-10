const router = require('express').Router();
const { Event } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async function (req, res) {
  const eventData = await Event.findAll();

  const events = eventData.map((el) => el.get({ plain: true })); 
  
  res.render('all',{
    events
  });
});

router.get('/dashboard', withAuth, async function (req, res) {
  const eventData = await Event.findAll({
    where: {
      owner_id: req.user.id,
    },
  });

  const events = eventData.map((el) => el.get({ plain: true }));
  
  res.render('userCardsAll',{
    events
  })
});

module.exports = router;
