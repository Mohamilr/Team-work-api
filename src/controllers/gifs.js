import jwt from 'jsonwebtoken';
import cloudinary from 'cloudinary';
import pool from '../models/database';

// import cloudinary
import cloudinaryConfig from '../config/cloudinary.config';



const gifController = {
    postGif(req, res) {
        //  gif key (gif) form-data
        let image = req.files.gif;
        const { gifTitle, gifAuthorId } = req.body;
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

                // empty body values (form-data)
                if (!image || !gifTitle || !gifAuthorId) {
                    return res.status(400).json({
                        status: 'error',
                        error: 'all fields are required'
                    });
                };

                // cloudinary upload
                cloudinary.v2.uploader.upload(image.tempFilePath, { resourse_type: 'gif' })
                    .then(async (result) => {
                        // gif upload query
                        const gif = `INSERT INTO gifs (image, gifTitle, gifAuthorId , gifCreatedOn)
            VALUES($1, $2, $3, $4) RETURNING *`;
                        const values = [result.url, gifTitle, gifAuthorId, new Date().toLocaleString()];
                        const gifQuery = await pool.query(gif, values);

                        // post gif response 
                        res.status(201).json({
                            status: 'success',
                            data: {
                                gifId: gifQuery.rows[0].gifid,
                                message: 'gif image successfully posted',
                                createdOn: gifQuery.rows[0].createdon,
                                title: gifQuery.rows[0].title,
                                imageUrl: gifQuery.rows[0].image
                            }
                        });
                    })
                    .catch((e) =>
                        console.log(e)
                    )
            })
        }
        catch (e) {
            console.log(e);
        };
    },
    deleteGif(req, res) {
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

                // delete gif query
                const deleteGif = `DELETE FROM gifs WHERE gifId=$1`;
                const value = [id];
                const deleteGifQuery = await pool.query(deleteGif, value);

                // delete gif response
                res.status(200).json({
                    status: 'success',
                    data: {
                        message: 'gif post successfully deleted'
                    }
                });
            });
        }
        catch (e) {
            console.log(e)
        };
    }
}

// export gif controller routes
export default gifController;