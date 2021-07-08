const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const eventsRoutes = require('./eventsRoutes');

router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/', eventsRoutes);

module.exports = router;
