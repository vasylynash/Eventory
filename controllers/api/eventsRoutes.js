const router = require('express').Router();
const { Event } = require('../../models');
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
        dateTime: req.body.dateTime,
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

module.exports = router;
