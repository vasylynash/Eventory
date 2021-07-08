const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const eventRoutes = require('./eventRoutes');

router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/', eventRoutes);

module.exports = router;
