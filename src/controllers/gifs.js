import jwt from 'jsonwebtoken';
import cloudinary from 'cloudinary';
import pool from '../models/database';

// configure cloudinary
import cloudinaryConfig from '../config/cloudinary.config';



const gifController = {
     postGif (req, res) {
        let image = req.files.gif;
        const { gifTitle, gifAuthorId } = req.body;
        try {
            jwt.verify(req.token, process.env.SECRET_KEY, async (err, data) => {
                if (!image || !gifTitle || !gifAuthorId) {
                    return res.status(400).json({
                        status: 'error',
                        error: 'all fields are required'
                    });
                };

                if(err) {
                    return res.status(403).json({
                        status: 'error',
                        error: 'incorrect token'
                    })
                }


                cloudinary.v2.uploader.upload(image.tempFilePath, {resourse_type : 'gif'})
                .then(async (result) =>  {
                const gif = `INSERT INTO gifs (image, gifTitle, gifAuthorId , gifCreatedOn)
            VALUES($1, $2, $3, $4) RETURNING *`;
            const values = [result.url, gifTitle, gifAuthorId, new Date().toLocaleString()];
            const gifQuery = await pool.query(gif, values)

                res.status(201).json({
                    status: 'success',
                    data:  {
                        gifId: gifQuery.rows[0].gifid,
                        message: 'gif image successfully posted',
                        createdOn: gifQuery.rows[0].createdon,
                        title: gifQuery.rows[0].title,
                        imageUrl: gifQuery.rows[0].image
                    }
                })
                }).catch((e) =>
                    console.log(e) 
                )
            })
   
        }
        catch (e) {
            console.log(e);
        }    
    },
    deleteGif (req, res) {
        const id = parseInt(req.params.id);
        try {
            jwt.verify(req.token, process.env.SECRET_KEY, async (err, data) => {
                if(err) {
                    return res.status(403).json({
                        status: 'error',
                        error: 'incorrect token'
                    })
                }

                const deleteGif = `DELETE FROM gifs WHERE gifId=$1`
                const value = [id];
                const deleteGifQuery = await pool.query(deleteGif, value);

                res.status(200).json({
                    status: 'success',
                    data : {
                        message: 'gif post successfully deleted'
                    }
                })

            })
        }
        catch (e) {
            console.log(e)
        } 
    }

}

export default gifController;