const router = require('express').Router();
const { Event, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async function (req, res) {
  const eventData = await Event.findAll({
    include: [
      {
        model: User,
        attributes: ['username']
      }
    ]
  });

  const events = eventData.map((el) => el.get({ plain: true })); 
  console.log(events);
  
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
