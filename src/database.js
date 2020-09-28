const mysql = require("mysql");
const { promisify } = require("util");
const { database } = require("./keys");
const pool = mysql.createPool(database);
pool.getConnection((e, connection) => {
  if (e) {
    console.log(e.code);
    return;
  }
  if (connection) connection.release();

  console.log(connection.state);
});
pool.query = promisify(pool.query);
module.exports = pool;
