const { db, helpers, errors } = require("./pgp");

const optionalCol = col => ({
  name: col, 
  skip: (col) => col.value === null || col.value === undefined || !col.exists
})

const getAll = async (params) => {
  try {
    const SQL = "SELECT * FROM reviews WHERE film_id = $/film_id/ AND app_id = $/app_id/"
    const reviews = await db.any(SQL, params);
    return reviews;
  } catch (err) {
    throw err;
  }
}

const getTodo = async (id) => { 
  let todo;

  try {
    todo = await db.one("SELECT * FROM todos WHERE id = $/id/", { id });
    return todo;
  } catch (err) {
    if (err instanceof errors.QueryResultError &&
        err.code === errors.queryResultErrorCode.noData) {
        todo = false
        return todo;
    }
    throw (err)
  }
}

const create = async (review) => {
  let newReview;
  try {
    newReview = await db.one(
      `INSERT INTO reviews(id, app_id, film_id, reviewer_username, text) 
      VALUES($/id/, $/app_id/, $/film_id/, $/reviewer_username/, $/text/) 
      RETURNING *`, review)
    return newReview;
  } catch (err) {
    let customErr = `App with id: '${review.app_id}' doesn't exist.`
    if (err.code === "23503") {
      err = customErr
    }
    throw err;
  }
}

const removeTodo = async (id) => { 
  let todo;
  try {
    todo = await db.one(`DELETE FROM todos WHERE id = $/id/ RETURNING *`, { id });
    return todo;
  } catch (err) {
    if (err instanceof errors.QueryResultError &&
        err.code === errors.queryResultErrorCode.noData) {
        todo = false 
        return todo;
    }
    throw (err)
  }
}

const updateTodo = async (id, todoEdits) => {
  const columnSet = new helpers.ColumnSet([
    optionalCol("text"),
    optionalCol("completed"),
    optionalCol("owner"),
  ], { table: "todos" })

  const updateQuery = `${helpers.update(todoEdits, columnSet)} 
    WHERE id = $/id/ RETURNING *`;
  
  let todo;
  try {
    todo = await db.one(updateQuery, { id })
    return todo
  } catch (err) {
    if (
      (err instanceof errors.QueryResultError &&
       err.code === errors.queryResultErrorCode.noData)
      || 
      (err.code === "23503") //New owner not in table 
    ) {
        todo = false 
        return todo;
    }
    throw (err)
  }
}

module.exports = {
  getAll,
  getTodo,
  create, 
  removeTodo,
  updateTodo,
};
