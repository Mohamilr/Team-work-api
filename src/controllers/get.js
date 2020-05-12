import jwt from 'jsonwebtoken';
import pool from '../models/database';

const get = {
    getAllArticlesGif(req, res) {
        try {
            // verify token
            jwt.verify(req.token, process.env.SECRET_KEY, async (err, data) => {
                // incorrect token
                if (err) {
                    return res.status(403).json({
                        status: 'error',
                        error: 'incorrect token'
                    });
                };

                // get all articles and gifs query 
                const getArticles = await pool.query(`SELECT * FROM articles`);
                const getGifs = await pool.query(`SELECT * FROM gifs`)

                // if there are no articles and gif available
                if (!getArticles.rowCount || !getGifs.rowCount) {
                    return res.status(400).json({
                        status: 'error',
                        error: 'sorry, there are no articles or gifs available in the database'
                    });
                };

                // get response
                res.status(200).json({
                    status: 'success',
                    data: {
                          articles: getArticles.rows,
                          gifs: getGifs.rows
                        }
                });
            });
        }
        catch (e) {
            console.log(e)
        };
    },
    getSingleArticle(req, res) {
        // parameter (number)
        const id = parseInt(req.params.id);
        try {
            // verify token
            jwt.verify(req.token, process.env.SECRET_KEY, async (err, data) => {
                // incorrect token
                if (err) {
                    return res.status(403).json({
                        status: 'error',
                        error: 'incorrect token'
                    });
                };

                // select single article query
                const getSingleArticle = `SELECT * FROM articles WHERE articleId=$1`;
                const value = [id]
                const getSingleArticleQuery = await pool.query(getSingleArticle, value);

                // get all comments associated with the selected article
                const comment = await pool.query(`SELECT commentid, comment, authorid FROM article_comments WHERE articleId=${id}`);

                // get response
                res.status(200).json({
                    status: 'success',
                    data: {
                        commentCount: comment.rowCount,
                        id: getSingleArticleQuery.rows[0].articleid,
                        createdOn: getSingleArticleQuery.rows[0].createdon,
                        title: getSingleArticleQuery.rows[0].title,
                        article: getSingleArticleQuery.rows[0].article,
                        comment: comment.rows
                    }
                });
            });
        }
        catch (e) {
            console.log(e)
        };
    },
    getSingleGif(req, res) {
        // parameter (number)
        const id = parseInt(req.params.id);
        try {
            // verify token
            jwt.verify(req.token, process.env.SECRET_KEY, async (err, data) => {
                // incorrect token
                if (err) {
                    return res.status(403).json({
                        status: 'error',
                        error: 'incorrect token'
                    });
                };

                // select single gif
                const getSingleGif = `SELECT * FROM gifs WHERE gifId=$1`;
                const value = [id]
                const getSingleGifQuery = await pool.query(getSingleGif, value);

                // select all comments associated with selected gif
                const comments = await pool.query(`SELECT commentid, comment, authorid FROM gif_comments WHERE gifId=${id}`);

                // get response
                res.status(200).json({
                    status: 'success',
                    data: {
                        commentCount: comments.rowCount,
                        id: getSingleGifQuery.rows[0].gifid,
                        createdOn: getSingleGifQuery.rows[0].gifcreatedon,
                        title: getSingleGifQuery.rows[0].giftitle,
                        url: getSingleGifQuery.rows[0].image,
                        comments: comments.rows
                    }
                });
            });
        }
        catch (e) {
            console.log(e)
        };
    }

}

// export get to routes
export default get;