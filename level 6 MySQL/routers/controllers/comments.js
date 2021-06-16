const commentsModel = require('./../../db/models/comments');

const createNewComment = (req, res) => {
	const query = `INSERT INTO comments (comment ,
    article_id  ) VALUES (? , ? )`;
	let x ;
  const data = [req.body.comment, req.params.id];
  connection.query(query, data, (err, results) => {
    if (err) throw err;
    console.log(results);
  });
  const query1 = `select * from comments where comment = ?`;
  const data1 = [req.body.comment];
  connection.query(query1, data1, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.json(results);
  });
};

module.exports = {
	createNewComment,
};
