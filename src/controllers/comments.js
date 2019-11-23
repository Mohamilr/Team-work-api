import jwt from 'jsonwebtoken';
import pool from '../models/database';

// comment controller
const comments = {
    async articleComment (req, res) {
        // parameter (number)
        const id = parseInt(req.params.id)
        // body values
        const { comment, authorId } = req.body;
        try {
            // verify token
            jwt.verify(req.token, process.env.SECRET_KEY, async (err, data) => {
                // incorrect token
                if(err) {
                    return res.status(403).json({
                        status: 'error',
                        error: 'incorrect token'
                    })
                }
 
                // empty body values
                if (!comment || !authorId) {
                    return res.status(400).json({
                        status: 'error',
                        error: 'all fields are required'
                    });
                }

                // select article query
                const check = `SELECT * FROM articles WHERE articleid=$1`;
                const checkValue = [id];
                const checkQuery = await pool.query(check, checkValue);

                // selected article comment query
                const comments = `INSERT INTO article_comments (comment, createdOn, authorId, articleId)
                                VALUES($1, $2, $3, $4) RETURNING *`;
                const values = [comment, new Date().toLocaleString(), authorId, id];
                const commentQuery = await pool.query(comments, values);
                
                // comment response
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
    },
    async gifComment (req, res) {
        // parameter
        const id = parseInt(req.params.id)
        // body values
        const { comment, authorId } = req.body;
        try {
            // verify token
            jwt.verify(req.token, process.env.SECRET_KEY, async (err, data) => {
                 // incorrect token
                 if(err) {
                    return res.status(403).json({
                        status: 'error',
                        error: 'incorrect token'
                    })
                } 

                // empty body values
                if (!comment || !authorId) {
                    return res.status(400).json({
                        status: 'error',
                        error: 'all fields are required'
                    });
                };


                // select gif query
                const check = `SELECT * FROM gifs WHERE gifId=$1`;
                const checkValue = [id];
                const checkQuery = await pool.query(check, checkValue);

                // selected gif comment query
                const comments = `INSERT INTO gif_comments (comment, createdon, authorid, gifid)
                                VALUES($1, $2, $3, $4) RETURNING *`;
                const values = [comment, new Date().toLocaleString(), authorId, id];
                const commentQuery = await pool.query(comments, values);
                
                // comment response
                res.status(201).json({
                    status: 'success',
                    data: {
                        message: 'Comment successfully created',
                        createdOn: commentQuery.rows[0].createdon,
                        gifTitle: checkQuery.rows[0].title,
                        comment: commentQuery.rows[0].comment
                    }
                })
            })
        }
        catch (e) {
            console.log(e);
        }
    }


}

// export comments to routes
export default comments;