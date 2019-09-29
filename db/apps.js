const { db, errors } = require('./pgp');

const createApp = async (app) => {
  try {
    let insertQuery = 
      `INSERT INTO apps(id, owner_email, owner_name, app_name) 
       VALUES($/app_id/, $/owner_email/, $/owner_name/, $/app_name/) RETURNING *`;
    let newApp = await db.one(insertQuery, app)
    return newApp;
  } catch (err) {
    // owner_email already in use 
    if (err.code === "23505" && err.detail.includes("already exists")) {
      let customErr = "Email already in use. It seems that the owner email you are trying use is already registered with an app. If you forgot the email you used to register your app contact the API developer.";
      err = customErr;
      throw customErr;
    }
    throw err;
  }
}

const getByOwnerEmail = async (email) => {
  try {
    let app = await db.one('SELECT * FROM apps WHERE owner_email = $/email/', {
      email
    });
    return app;
  } catch (err) {
    if (err instanceof errors.QueryResultError) {
      if (err.code === errors.queryResultErrorCode.noData) {
        const error = "App not found."
        throw error;
      }
    }
    throw err;
  }
}

const getUserById = async (id) => {
  try {
    let user = await db.one('SELECT * FROM users WHERE id = $1', id);
    return user;
  } catch (err) {
    throw err;
  }
}

const awardPoints = async (userId, points) => {
  try {
    let updateQuery = `UPDATE users SET points = points + $/points/ 
    WHERE id = $/userId/ RETURNING *`

    let user = await db.one(updateQuery, {
      userId,
      points
    })
    return user;
  } catch (err) {
    throw err;
  }
}

const getAll = async () => {
  try {
    let users = await db.any('SELECT * FROM users');
    return users;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  createApp,
  getByOwnerEmail,
  getUserById,
  awardPoints,
  getAll
}
