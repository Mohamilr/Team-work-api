import pool from '../models/database';
import jsonResponse from '../helpers/jsonResponse';

// comment controller
const comments = {
    async articleComment (req, res) {
        // parameter (number)
        const id = parseInt(req.params.id)
        // body values
        const comment = req.body;
        const authorId = req.id;

        try { 
                // empty body values
                if (!comment) {
                    return jsonResponse(res, 'error', 400, {
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
                return jsonResponse(res, 'success', 201, {
                    message: 'Comment successfully created',
                    createdOn: commentQuery.rows[0].createdon,
                    articleTitle: checkQuery.rows[0].title,
                    article: checkQuery.rows[0].article,
                    comment: commentQuery.rows[0].comment
                });
        }
        catch (e) {
            console.log(e)
        }
    },
    async gifComment (req, res) {
        // parameter
        const id = parseInt(req.params.id)
        // body values
        const comment = req.body;
        const authorId = req.id;

        try {
                // empty body values
                if (!comment) {
                    return jsonResponse(res, 'error', 400, 'all fields are required');
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
                return jsonResponse(res, 'success', 201, {
                    message: 'Comment successfully created',
                    createdOn: commentQuery.rows[0].createdon,
                    gifTitle: checkQuery.rows[0].title,
                    comment: commentQuery.rows[0].comment
                })
        }
        catch (e) {
            console.log(e);
        }
    }
}

// export comments to routes
export default comments;