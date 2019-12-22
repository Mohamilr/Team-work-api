import pool from '../models/database';
import jsonResponse from '../helpers/jsonResponse';

// query container
let checkQuery,
    sendQuery,
    data;

// comment controller
const comments = {
    async articleComment (req, res) {
        // parameter (number)
        const id = parseInt(req.params.id)
        // body values
        const comment = req.body.comment;
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
                checkQuery = await pool.query(`SELECT * FROM articles WHERE articleid=$1`, [id]);

                // selected article comment query
                sendQuery = await pool.query(`INSERT INTO article_comments (comment, createdOn, authorId, articleId)
                VALUES($1, $2, $3, $4) RETURNING *`, [comment, new Date().toLocaleString(), authorId, id]);
                
                data = sendQuery.rows[0];

                // comment response
                return jsonResponse(res, 'success', 201, {
                    message: 'Comment successfully created',
                    createdOn: data.createdon,
                    articleTitle: checkQuery.rows[0].title,
                    article: checkQuery.rows[0].article,
                    comment: data.comment
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
        const comment = req.body.comment;
        const authorId = req.id;

        try {
                // empty body values
                if (!comment) {
                    return jsonResponse(res, 'error', 400, 'all fields are required');
                };

                // select gif query
                checkQuery = await pool.query(`SELECT * FROM gifs WHERE gifId=$1`, [id]);

                // selected gif comment query
                sendQuery = await pool.query(`INSERT INTO gif_comments (comment, createdon, authorid, gifid)
                VALUES($1, $2, $3, $4) RETURNING *`, [comment, new Date().toLocaleString(), authorId, id]);
                
                data = sendQuery.rows[0];
                
                // comment response
                return jsonResponse(res, 'success', 201, {
                    message: 'Comment successfully created',
                    createdOn: data.createdon,
                    gifTitle: checkQuery.rows[0].giftitle,
                    comment: data.comment
                })
        }
        catch (e) {
            console.log(e);
        }
    }
}

// export comments to routes
export default comments;