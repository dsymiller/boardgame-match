const express = require('express');
const boardgamesController = require('./controllers/boardgamesController');
const userController = require('./controllers/userController');

const router = express.Router();

// handles login requests
router.post('/login', userController.verifyUser, (req, res) => {
  const { user } = res.locals;
  res.status(200).json({ loggedIn: true, user });
});

// handles signup requests
router.post('/signup/', userController.createUser, (req, res) => {
  const { user } = res.locals;
  res.status(200).json({ signedUp: true, user });
});

// handles initial fetch of boardgames
router.get(
  '/boardgames/:userid',
  boardgamesController.getBoardgames,
  boardgamesController.getFavorites,
  (req, res) => {
    res.status(200).json(res.locals);
  }
);

// handles adding a favorite game for a user
router.put(
  '/boardgames/favorites/:userid/:gameid',
  boardgamesController.addFavorite,
  boardgamesController.getFavorites,
  (req, res) => {
    res.status(200).json(res.locals);
  }
);

// handles deleting a favorite game for a user
router.delete(
  '/boardgames/favorites/:userid/:gameid',
  boardgamesController.deleteFavorite,
  boardgamesController.getFavorites,
  (req, res) => {
    res.status(200).json(res.locals);
  }
);

// handles getting matches
router.get(
  '/boardgames/matches/:userid/:gameid1/:gameid2/:gameid3',
  boardgamesController.getMatches,
  (req, res) => {
    res.status(200).json(res.locals);
  }
);

module.exports = router;
