const connection = require("../../db/db");

const createNewRole = (req, res) => {
const query = `INSERT INTO roles (role) VALUES (?)`;
  const data = [req.body.role];
  connection.query(query, data, (err, results) => {
	  if (err) throw err
    console.log(results);
  });
  const query1 = `select * from roles where role = ?`
  connection.query(query1, data, (err, results) => {
	if (err) throw err
  console.log(results);
  res.json(results)
});
};

module.exports = {
	createNewRole,
};
