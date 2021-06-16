const articlesModel = require('./../../db/models/articles');
const connection = require("../../db/db");



const getAllArticles = (req, res) => {
	const query = `SELECT * FROM articles where is_deleted=?`
	const data = [0]
	query.connection(query , data , (err,results)=>{
		if (err) throw err ;
		console.log("article" , results)
		if (result.length === 0 ){
			res.json("not found")
		}else {
			res.json(results)
		}
	})
};

const getArticlesByAuthor = (req, res) => {
	const query = `SELECT * FROM articles where is_deleted=? AND author_id = ?`
	const data = [0 , req.body.author_id]
	query.connection(query , data , (err,results)=>{
		if (err) throw err ;
		console.log("article" , results)
		if (result.length === 0 ){
			res.json("not found")
		}else {
			res.json(results)
		}
	})
};

const getAnArticleById = (req, res) => {
	const _id = req.params.id;

	if (!_id) return res.status(404).json('not found');

	articlesModel
		.findOne({ _id })
		.populate('author', 'firstName -_id')
		.exec()
		.then((result) => {
			res.status(200).json(result);
		})
		.catch((err) => {
			res.send(err);
		});
};

const createNewArticle = (req, res) => {
	const query = `INSERT INTO articles title=? ,description =?, author_id ) VALUES (? , ? , ?)`;
	const data = [req.body.title , req.body.description , req.body.author_id]
  connection.query(query, data, (err, results) => {
	  if (err) throw err
    console.log(results);
  });
  const query1 = `select * from articles where title = ?`
  const data1 =[req.body.title]
  connection.query(query1, data1, (err, results) => {
	if (err) throw err
  console.log(results);
  res.json(results)
});
};

const updateAnArticleById = (req, res) => {
	const query = `UPDATE articles SET title=? ,description=?, author_id=? WHERE id=?`;
	const data = [req.body.title , req.body.description , req.body.author_id , req.body.id]
  connection.query(query, data, (err, results) => {
	  if (err) throw err
    console.log(results);
  });
  const query1 = `select * from articles where id = ?`
  const data1 =[req.body.id]
  connection.query(query1, data1, (err, results) => {
	if (err) throw err
  console.log(results);
  res.json(results)
});
};

const deleteArticleById = (req, res) => {
	const query = `UPDATE articles SET is_deleted=? WHERE id=?`;
	const data = [ 1 , req.body.id]
  connection.query(query, data, (err, results) => {
	  if (err) throw err
    console.log(results);
  });
  const query1 = `SELECT * FROM articles WHERE id = ?`
  const data1 =[req.body.id]
  connection.query(query1, data1, (err, results) => {
	if (err) throw err
  console.log(results);
  res.json(results)
});
};

const deleteArticlesByAuthor = (req, res) => {
	const author = req.body.author;

	articlesModel
		.deleteMany({ author })
		.then((result) => {
			res.status(200).json({
				success: true,
				message: `Success Delete atricle with id => ${author}`,
			});
		})
		.catch((err) => {
			res.send(err);
		});
};

module.exports = {
	getAllArticles,
	getArticlesByAuthor,
	getAnArticleById,
	createNewArticle,
	updateAnArticleById,
	deleteArticleById,
	deleteArticlesByAuthor,
};
