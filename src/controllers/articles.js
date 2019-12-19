import jwt from 'jsonwebtoken';
import pool from '../models/database';
import jsonResponse from '../helpers/jsonResponse';

// article conrtroller
const articleController = {
    async createArticle(req, res) {
        // body values
        const { title, article, authorId } = req.body;

        try {
            // empty body values
            if (!title || !article || !authorId) {
                return jsonResponse.error(res, 'error', 400, 'all fields are required')
            };

            // database post article query
            const create = `INSERT INTO articles (title, article, authorid, createdon)
                                VALUES($1, $2, $3, $4) RETURNING *`;
            const values = [title, article, authorId, new Date().toLocaleString()];
            const createQuery = await pool.query(create, values);

            // article post response
            return jsonResponse.success(res, 'success', 201, {
                message: 'Article successfully posted',
                articleId: createQuery.rows[0].articleid,
                createdOn: createQuery.rows[0].createdon,
                title: createQuery.rows[0].title,
                article: createQuery.rows[0].article
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
            const check = `SELECT * FROM articles WHERE articleid=$1`;
            const checkValue = [id];
            const checkQuery = await pool.query(check, checkValue);

            if(!checkQuery.rowCount) {
                return jsonResponse.error(res, 'error', 404, 'article not found')
            }

            // body values
            const title = req.body.title || checkQuery.rows[0].title;
            const article = req.body.article || checkQuery.rows[0].article;

            // update selected article query
            const modify = `UPDATE articles SET title=$1, article=$2, createdon=$3 WHERE articleid=$4 RETURNING *`;
            const value = [title, article, new Date().toLocaleString(), id];
            const modifyQuery = await pool.query(modify, value)

            // update response
            return jsonResponse.success(res, 'success', 200, {
                message: 'Article successfully updated',
                title: title,
                article: article,
                modifiedOn: modifyQuery.rows[0].createdon
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
            const remove = `DELETE FROM articles WHERE articleid=$1`;
            const value = [id];
            const removeQuery = await pool.query(remove, value);
            
            // if article id is not found
            if(!removeQuery.rowCount) {
                return jsonResponse.error(res, 'error', 404, 'article not found')
            }

            // delete response
            return jsonResponse.success(res, 'success', 200, 'Article successfully deleted')
        }
        catch (e) {
            console.log(e);
        };
    }
}

// export article controller to routes
export default articleController;