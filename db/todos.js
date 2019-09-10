const { db, helpers, errors } = require("./pgp");

const optionalCol = col => ({
  name: col, 
  skip: (col) => col.value === null || col.value === undefined || !col.exists
})

const getAllTodos = (owner) => db.any("SELECT * FROM todos", owner);

const getTodo = async (id, owner) => { 
  let todo;

  try {
    todo = await db.one("SELECT * FROM todos WHERE id = $/id/", { 
      id,
      owner
    });
    return todo;
  } catch (err) {
    if (err instanceof errors.QueryResultError &&
        err.code === errors.queryResultErrorCode.noData) {
        todo = {}
        return todo;
    }
    throw (err)
  }
}

const createTodo = async (todo) => {
  let newTodo;
  try {
    newTodo = await db.one(`INSERT INTO todos(owner, text) VALUES($/owner/, $/text/)  
      RETURNING *`, todo)
    return newTodo;
  } catch (err) {
    let customErr = `owner '${todo.owner}' doesn't exist.`
    if (err.code === "23503") {
      err = customErr
    }
    throw err;
  }
}

const removeTodo = async (id, owner) => { 
  let todo;
  try {
    todo = await db.one(`DELETE FROM todos WHERE id = $/id/ RETURNING *`, { id, owner });
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

const updateTodo = async (id, owner, todoEdits) => {
  const columnSet = new helpers.ColumnSet([
    optionalCol("text"),
    optionalCol("value"),
    optionalCol("completed"),
  ], { table: "todos" })

  const updateQuery = `${helpers.update(todoEdits, columnSet)} 
    WHERE id = $/id/ AND owner = $/owner/ RETURNING *`;
  
  let todo;
  try {
    todo = await db.one(updateQuery, {id, owner})
    return todo
  } catch (err) {
    if (err instanceof errors.QueryResultError &&
        err.code === errors.queryResultErrorCode.noData) {
        todo = false 
        return todo;
    }
    throw (err)
  }
}

module.exports = {
  getAllTodos,
  getTodo,
  createTodo, 
  removeTodo,
  updateTodo,
};
