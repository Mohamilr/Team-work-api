import pool from '../models/database';
import jsonResponse from '../helpers/jsonResponse';

// query container
let sendQuery,
    data;
    
const get = {
    async getAllArticlesGif(req, res) {
        try {
            // get all articles and gifs query 
            const getArticles = await pool.query(`SELECT * FROM articles`);
            const getGifs = await pool.query(`SELECT * FROM gifs`)

            // if there are no articles and gif available
            if (!getArticles.rowCount || !getGifs.rowCount) {
                return jsonResponse(res, 'errror', 400, 'sorry, there are no articles or gifs available in the database');
            };

            // get response
            return jsonResponse(res, 'success', 200, {
                articles: getArticles.rows,
                gifs: getGifs.rows
            });
        }
        catch (e) {
            console.log(e)
        };
    },
    async getSingleArticle(req, res) {
        // parameter (number)
        const id = parseInt(req.params.id);

        try {
            // select single article query
            sendQuery = await pool.query(`SELECT * FROM articles WHERE articleId=$1`, [id]);

            // get all comments associated with the selected article
            const comment = await pool.query(`SELECT commentid, comment, authorid FROM article_comments WHERE articleId=$1`, [id]);

            data = sendQuery.rows[0];
            // get response
            return jsonResponse(res, 'success', 200, {
                commentCount: comment.rowCount,
                id: data.articleid,
                createdOn: data.createdon,
                title: data.title,
                article: data.article,
                comment: comment.rows
            });
        }
        catch (e) {
            console.log(e)
        };
    },
    async getSingleGif(req, res) {
        // parameter (number)
        const id = parseInt(req.params.id);
        
        try {
            // select single gif
            sendQuery = await pool.query(`SELECT * FROM gifs WHERE gifId=$1`, [id]);

            // select all comments associated with selected gif
            const comments = await pool.query(`SELECT commentid, comment, authorid FROM gif_comments WHERE gifId=${id}`);

            data = sendQuery.rows[0];
            // get response
            return jsonResponse(res, 'success', 200, {
                commentCount: comments.rowCount,
                id: data.gifid,
                createdOn: data.gifcreatedon,
                title: data.giftitle,
                url: data.image,
                comments: comments.rows
            });
        }
        catch (e) {
            console.log(e)
        };
    }
}

// export get to routes
export default get;