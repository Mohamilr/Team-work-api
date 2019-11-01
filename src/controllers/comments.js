import jwt from 'jsonwebtoken';
import pool from '../models/database';

const comments = {
    articleComment (req, res) {
        const id = parseInt(req.params.id)
        const { comment, authorId } = req.body;
        try {
            jwt.verify(req.token, process.env.SECRET_KEY, async (err, data) => {
                if(err) {
                    return res.status(403).json({
                        status: 'error',
                        error: 'incorrect token'
                    })
                }

                const check = `SELECT * FROM articles WHERE articleid=$1`;
                const checkValue = [id];
                const checkQuery = await pool.query(check, checkValue);


                const comments = `INSERT INTO article_comments (comment, createdon, authorid, articleid)
                                VALUES($1, $2, $3, $4) RETURNING *`;
                const values = [comment, new Date().toLocaleDateString(), authorId, id];
                const commentQuery = await pool.query(comments, values);
                

                res.status(201).json({
                    status: 'success',
                    data: {
                        message: 'Comment successfully created',
                        createdOn: commentQuery.rows[0].createdon,
                        articleTitle: checkQuery.rows[0].title,
                        article: checkQuery.rows[0].article,
                        comment: commentQuery.rows[0].comment
                    }
                })
            })
        }
        catch (e) {
            console.log(e)
        }
    }

}

export default comments;