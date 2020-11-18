const db = require('../database');

const userController = {};

// checks user credentials against database
userController.verifyUser = async (req, res, next) => {
  const { username, password } = req.body;
  const searchQuery = `SELECT *
                FROM users
                WHERE username=$1`;
  try {
    const response = await db.query(searchQuery, [username]);
    if (!response.rows.length) {
      return next({
        log: `userController.verifyUser: ERROR username not in database`,
        status: 400,
        message: { err: 'that username does not exist' },
      });
    }
    const dbPass = response.rows[0].password;
    if (dbPass !== password) {
      return next({
        log: `userController.verifyUser: ERROR password does not match`,
        status: 400,
        message: { err: 'username/password combo is incorrect' },
      });
    }
    res.locals.user = response.rows[0];
    next();
  } catch (err) {
    next({
      log: `userController.verifyUser: ERROR ${err}`,
      status: 500,
      message: { err: 'database error occured' },
    });
  }
};

userController.createUser = async (req, res, next) => {
  const { username, password } = req.body;
  const searchQuery = `SELECT *
                      FROM users
                      WHERE users.username=$1`;
  const insertQuery = `INSERT INTO users (username, password)
                      VALUES ($1, $2)`;
  try {
    const response = await db.query(searchQuery, [username]);
    if (response.rows.length) {
      return next({
        log: `userController.createUser: ERROR username already exists`,
        status: 400,
        message: { err: 'that username is already in use' },
      });
    }
    res.locals.user = response.rows[0];
    try {
      await db.query(insertQuery, [username, password]);
      next();
    } catch (err) {
      next({
        log: `userController.createUser: ERROR ${err}`,
        status: 500,
        message: { err: 'database error occured' },
      });
    }
    next();
  } catch (err) {
    next({
      log: `userController.createUser: ERROR ${err}`,
      status: 500,
      message: { err: 'database error occured' },
    });
  }
};
module.exports = userController;
