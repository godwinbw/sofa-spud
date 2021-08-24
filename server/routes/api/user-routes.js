
const router = require('express').Router();
const {
  addUser,
  getSingleUser,
  addTitleToWatchlist,
  removeTitleFromWatchlist,
  login,
} = require('../../controllers/user-controller');

// import middleware
const { authMiddleware } = require('../../utils/auth');

router.route('/').post(addUser).put(authMiddleware, addTitleToWatchlist);

router.route('/login').post(login);

router.route('/me').get(authMiddleware, getSingleUser);

router.route('/movies/:movieId').delete(authMiddleware, removeTitleFromWatchlist);

module.exports = router;