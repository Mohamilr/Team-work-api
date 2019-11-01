import jwt from 'jsonwebtoken';
import pool from '../models/database';

const get = {
    getAllArticlesGif(req, res) {
        try {
            jwt.verify(req.token, process.env.SECRET_KEY, async (err, data) => {
                if (err) {
                    return res.status(403).json({
                        status: 'error',
                        error: 'incorrect token'
                    })
                }

                const get = `SELECT * FROM articles, gifs `;
                const getQuery = await pool.query(get);

                if (!getQuery.rows[0]) {
                    return res.status(400).json({
                        status: 'error',
                        error: 'sorry, there are no articles or gifs available in the database'
                    })
                }

                res.status(200).json({
                    status: 'success',
                    data: [
                        getQuery.rows
                    ]
                })
            })
        }
        catch (e) {
            console.log(e)
        }
    },
    getSingleArticle(req, res) {
        const id = parseInt(req.params.id);
        try {
            jwt.verify(req.token, process.env.SECRET_KEY, async (err, data) => {
                if (err) {
                    return res.status(403).json({
                        status: 'error',
                        error: 'incorrect token'
                    })
                }

                const getSingleArticle = `SELECT * FROM articles WHERE articleId=$1`
                const value = [id]
                const getSingleArticleQuery = await pool.query(getSingleArticle, value);

                res.status(200).json({
                    status: 'success',
                    data: {
                        id: getSingleArticleQuery.rows[0].articleid,
                        createdOn: getSingleArticleQuery.rows[0].createdon,
                        title: getSingleArticleQuery.rows[0].title,
                        article: getSingleArticleQuery.rows[0].article,
                        comment: []
                    }
                })
            })
        }
        catch (e) {
            console.log(e)
        }
    },
    getSingleGif (req, res) {
        const id = parseInt(req.params.id);
        try {
            jwt.verify(req.token, process.env.SECRET_KEY, async (err, data) => {
                if (err) {
                    return res.status(403).json({
                        status: 'error',
                        error: 'incorrect token'
                    })
                }
                
                const getSingleGif = `SELECT * FROM gifs WHERE gifId=$1`
                const value = [id]
                const getSingleGifQuery = await pool.query(getSingleGif, value);

                res.status(200).json({
                    status: 'success',
                    data: {
                        id: getSingleGifQuery.rows[0].gifid,
                        createdOn: getSingleGifQuery.rows[0].createdon,
                        title: getSingleGifQuery.rows[0].title,
                        url: getSingleGifQuery.rows[0].image,
                        comment: []
                    }

                })
            })
        }
        catch (e) {
            console.log(e)
        }
    }

}

export default get;