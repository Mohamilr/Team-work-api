import jwt from 'jsonwebtoken';
import cloudinary from 'cloudinary';
import { image } from 'cloudinary/lib-es5/cloudinary';
import pool from '../models/database';

// configure cloudinary

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})


const gifController = {
     postGif (req, res) {
        let image = req.files.gif;
        const { title, authorId } = req.body;
        try {
            jwt.verify(req.token, process.env.SECRET_KEY, async (err, data) => {
                if (!image || !title || !authorId) {
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
                const gif = `INSERT INTO gifs (image, title, authorId , createdOn)
            VALUES($1, $2, $3, $4) RETURNING *`;
            const values = [result.url, title, authorId, new Date().toLocaleDateString()];
            const gifQuery = await pool.query(gif, values)

                res.status(201).json({
                    status: 'success',
                    data:  {
                        gifId: gifQuery.rows[0].gifid,
                        message: '',
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
    }

}

export default gifController;