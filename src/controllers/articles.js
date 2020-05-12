import pool from '../models/database';
import jsonResponse from '../helpers/jsonResponse';

// query container
let checkQuery,
    sendQuery,
    data;

// article conrtroller
const articleController = {
    async createArticle(req, res) {
        // body values
        const { title, article } = req.body;
        const authorId = req.id;

        try {
            // empty body values
            if (!title || !article) {
                return jsonResponse(res, 'error', 400, 'all fields are required');
            };

            // database post article query
            sendQuery = await pool.query(`INSERT INTO articles (title, article, authorid, createdon)
            VALUES($1, $2, $3, $4) RETURNING *`, [title, article, authorId, new Date().toLocaleString()]);

            data = sendQuery.rows[0];
            // article post response
            return jsonResponse(res, 'success', 201, {
                message: 'Article successfully posted',
                articleId: data.articleid,
                createdOn: data.createdon,
                title: data.title,
                article: data.article,
            })
        }
        catch (e) {
            console.log(e);
        }
    },
    async modifyArticle(req, res) {
        //  parameter (number)
        const id = parseInt(req.params.id);

        try {
            // select an article query
            checkQuery = await pool.query(`SELECT * FROM articles WHERE articleid=$1`, [id]);

            if(!checkQuery.rowCount) {
                return jsonResponse(res, 'error', 404, 'article not found')
            }

            data = checkQuery.rows[0];
            // body values
            const title = req.body.title || data.title;
            const article = req.body.article || data.article;

            // update selected article query
            sendQuery = await pool.query(`UPDATE articles SET title=$1, article=$2, createdon=$3 WHERE articleid=$4 RETURNING *`, [title, article, new Date().toLocaleString(), id])

            data = sendQuery.rows[0];
            // update response
            return jsonResponse(res, 'success', 200, {
                message: 'Article successfully updated',
                title: title,
                article: article,
                modifiedOn: data.createdon
            })
        }
        catch (e) {
            console.log(e)
        };
    },
    async deleteArticle(req, res) {
        //  parameter (number)
        const id = parseInt(req.params.id);
        
        try {
            // delete article query
            sendQuery = await pool.query(`DELETE FROM articles WHERE articleid=$1`, [id]);
            
            // if article id is not found
            if(!sendQuery.rowCount) {
                return jsonResponse(res, 'error', 404, 'article not found')
            }

            // delete response
            return jsonResponse(res, 'success', 200, 'Article successfully deleted')
        }
        catch (e) {
            console.log(e);
        };
    }
}

// export article controller to routes
export default articleController;