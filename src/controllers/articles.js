import jwt from 'jsonwebtoken';
import pool from '../models/database';


const articleController = {
    async createArticle(req, res) {
        const { title, article, userId } = req.body;

        try {
            jwt.verify(req.token, process.env.SECRET_KEY, async (err, data) => {
                if (!title || !article || !userId) {
                    res.status(400).json({
                        status: 'error',
                        error: 'all fields are required'
                    });
                };


                if (err) {
                    res.status(403).json({
                        status: 'error',
                        error: 'incorrect token'
                    })
                };



                const create = `INSERT INTO articles (title, article, userid, createdon)
                                VALUES($1, $2, $3, $4) RETURNING *`;
                const values = [title, article, userId, new Date().toLocaleDateString()];
                const createQuery = await pool.query(create, values);

                res.status(201).json({
                    status: 'success',
                    data: {
                        message: 'Article successfully posted',
                        articleId: createQuery.rows[0].articleid,
                        createdOn: createQuery.rows[0].createdon,
                        title: createQuery.rows[0].title
                    }
                })
            });

        }
        catch (e) {
            console.log(e);
        }
    },
    async modifyArticle (req, res) {
        const id = parseInt(req.params.id);

        try {
            jwt.verify(req.token, process.env.SECRET_KEY, async (err, data) => {
            
                if (err) {
                    res.status(403).json({
                        status: 'error',
                        error: 'incorrect token'
                    })
                };

                const check = `SELECT * FROM articles WHERE articleid=$1`;
                const checkValue = [id];
                const checkQuery = await pool.query(check, checkValue);

          
                const title = req.body.title || checkQuery.rows[0].title;
                const article = req.body.article || checkQuery.rows[0].article;

                const modify = `UPDATE articles SET title=$1, article=$2, createdon=$3 WHERE articleid=$4 RETURNING *`;
                const value = [title, article,new Date().toLocaleDateString(), id];
                const modifyQuery = await pool.query(modify, value)

                res.status(200).json({
                    status: 'success',
                    data: {
                        message: 'Article successfully updated',
                        title: title,
                        article: article,
                        modifiedOn: modifyQuery.rows[0].createdon
                    }
                })
            })
            
        }
        catch(e) {
            console.log(e)
        }
    },
    async deleteArticle (req, res) {
        const id = parseInt(req.params.id)
        try {
            jwt.verify(req.token, process.env.SECRET_KEY, async (err, data) => {
                if (err) {
                    res.status(403).json({
                        status: 'error',
                        error: 'incorrect token'
                    })
                };

                const remove = `DELETE FROM articles WHERE articleid=$1`;
                const value = [id];
                const removeQuery = await pool.query(remove, value);

                res.status(200).json({
                    status: 'success',
                    data: {
                        message: 'Article successfully deleted'
                    }
                })

            })
        }
        catch (e) {
            console.log(e);
        }
    }
}

export default articleController;