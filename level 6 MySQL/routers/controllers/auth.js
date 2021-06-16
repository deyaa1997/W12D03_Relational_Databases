const usersModel = require("./../../db/models/users");
const bcrypt = require("bcrypt");
const connection = require("../../db/db");
const jwt = require("jsonwebtoken");
require('dotenv').config();


const login = (req, res) => {
  const query = `SELECT * FROM users where email =?`;
  const data = [req.body.email];
  connection.query(query, data, async (err, results) => {
    if (err) throw err;
    if (results.length === 0) {
      res.status(404);
      res.json("Email is not found");
    } else {
      await bcrypt.compare(
        req.body.password,
        results[0].password,
        (err, result) => {
          if (result === true) {
            const SECRET = process.env.SECRET;
            const TOKEN_EXP_Time = process.env.TOKEN_EXP_Time;

              const payload = {
                id: results[0].id,
                role: results[0].role_id,
              };

              const options = {
                expiresIn: TOKEN_EXP_Time,
              };
              res.json(jwt.sign(payload, SECRET, options)) 
          } else {
            res.json("Password is incorrect");
            res.status(403);
          }
        }
      );
    }
  });
};

module.exports = {
  login,
};
