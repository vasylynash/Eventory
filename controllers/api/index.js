const router = require('express').Router();
const userRoutes = require('./userRoutes');
const eventsRoutes = require('./eventsRoutes');

router.use('/users', userRoutes);
router.use('/events', eventsRoutes);

module.exports = router;
