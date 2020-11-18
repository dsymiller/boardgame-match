const db = require('../database');
const matchQuery = require('./SQL/matchQuery');

const boardgamesController = {};

// checks user credentials against database
boardgamesController.getBoardgames = async (req, res, next) => {
  try {
    const searchQuery = `SELECT *
                        FROM boardgames
                        ORDER BY title ASC`;
    const result = await db.query(searchQuery);
    res.locals.boardgames = result.rows;
    next();
  } catch (err) {
    next({
      log: `boardgamesController.getBoardgames: ERROR ${err}`,
      status: 500,
      message: { err: 'database error occured' },
    });
  }
};
boardgamesController.getFavorites = async (req, res, next) => {
  const { userid } = req.params;
  try {
    const searchQuery = `SELECT b.title, b._id
                        FROM boardgames b
                        INNER JOIN users_boardgames ub ON ub.boardgames_id = b._id
                        INNER JOIN users u ON ub.users_id = u._id
                        WHERE u._id = $1`;
    const result = await db.query(searchQuery, [userid]);
    res.locals.favorites = result.rows.map((game) => game._id);
    next();
  } catch (err) {
    next({
      log: `boardgamesController.getFavorites: ERROR ${err}`,
      status: 500,
      message: { err: 'database error occured' },
    });
  }
};

boardgamesController.addFavorite = async (req, res, next) => {
  const { userid, gameid } = req.params;
  try {
    const insertQuery = `INSERT INTO users_boardgames (users_id, boardgames_id)
                        VALUES ($1, $2)`;
    await db.query(insertQuery, [userid, gameid]);
    next();
  } catch (err) {
    next({
      log: `boardgamesController.addFavorite: ERROR ${err}`,
      status: 500,
      message: { err: 'database error occured' },
    });
  }
};

boardgamesController.deleteFavorite = async (req, res, next) => {
  const { userid, gameid } = req.params;
  try {
    const deleteQuery = `DELETE FROM users_boardgames
                        WHERE users_id = $1
                        AND boardgames_id = $2`;
    await db.query(deleteQuery, [userid, gameid]);
    next();
  } catch (err) {
    next({
      log: `boardgamesController.deleteFavorite: ERROR ${err}`,
      status: 500,
      message: { err: 'database error occured' },
    });
  }
};

boardgamesController.getMatches = async (req, res, next) => {
  const { userid, gameid1, gameid2, gameid3 } = req.params;
  try {
    const result = await db.query(matchQuery, [
      userid,
      gameid1,
      gameid2,
      gameid3,
    ]);
    res.locals.matches = result.rows;
    console.log(res.locals.matches);
    next();
  } catch (err) {
    next({
      log: `boardgamesController.getMatches: ERROR ${err}`,
      status: 500,
      message: { err: 'database error occured' },
    });
  }
};

module.exports = boardgamesController;
