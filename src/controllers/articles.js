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
                        userId
                    }
                })
            });

        }
        catch (e) {
            console.log(e);
        }

    }
}

export default articleController;