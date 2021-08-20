const router = require('express').Router();
const path = require('path');
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

// serve react front-end in production
router.use((req, res) => {
  res.sendFile(path.join(__dirname, '../../client/build/index.html'));
});

module.exports = router;