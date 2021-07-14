const router = require('express').Router();
const { Event,Participants } = require('../../models');
const withAuth = require('../../utils/auth');

//  Post Event Route
router.post('/', withAuth, async (req, res) => {
  try {
    const newEvent = await Event.create({
      name: req.body.eventTitle,
      description: req.body.eventDescription,
      location: req.body.eventAddress,
      dateTime: req.body.eventDateTime,
      category_id: req.body.eventCategory,
      owner_id: req.user.id,
    });
    res.redirect('/dashboard');
  } catch (error) {
    res.status(400).json(error);
  }
});

//  Edit Event Route
router.put('/:id', withAuth, async (req, res) => {
  try {
    const eventUdate = await Event.update(
      {
        name: req.body.eventTitle,
        description: req.body.eventDescription,
        location: req.body.eventAddress,
        dateTime: req.body.eventDateTime,
        category_id: req.body.eventCategory,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json(eventUdate);
  } catch (error) {
    res.status(400).json(error);
  }
});

//  Delete Event Route
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const deleteEvent = await Event.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(deleteEvent);
  } catch (error) {
    res.status(400).json(error);
  }
});

// unjoin event
router.delete('/unjoin/:id', withAuth, async (req, res) => {
  try {
    const deleteMyEvent = await Participants.destroy({
      where: {
        user_id: req.body.userId,
        event_id: req.params.id
      },
    });
    res.status(200).json(deleteMyEvent);
  } catch (error) {
    res.status(400).json(error);
  }
});

// join event
router.post('/join', withAuth, async (req, res) => {
  try {
    const participantsData = await Participants.findOne({
      where: {
        event_id: req.body.eventid,
        user_id: req.body.currentuserid
      }
    })
    if (!participantsData){
      const newJoin = await Participants.create({
        event_id: req.body.eventid,
        user_id: req.body.currentuserid
      });
      res.json({userExists: false});
    } else res.json({userExists: true});

  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
