const usersModel = require('./../../db/models/users');
const bcrypt = require("bcrypt");
const connection = require("../../db/db");


const createNewAuthor = async(req, res) => {
	const query = `INSERT INTO users (firstName ,lastName, age , country , email , password ,role_id) VALUES (? , ? , ? , ? ,? , ? , 4)`;
	let pass = await bcrypt.hash(req.body.password, 10); 
	  

    console.log("pass" ,pass)
  const data = [req.body.firstName , req.body.lastName , req.body.age , req.body.country,req.body.email , pass ] ;
  connection.query(query, data, (err, results) => {
	  if (err) throw err
    console.log(results);
  });
  const query1 = `select * from users where email = ?`
  const data1 =[req.body.email]
  connection.query(query1, data1, (err, results) => {
	if (err) throw err
  console.log(results);
  res.json(results)
});
};

module.exports = {
	createNewAuthor,
};
