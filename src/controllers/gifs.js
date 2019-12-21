import cloudinary from 'cloudinary';
import pool from '../models/database';
import jsonResponse from '../helpers/jsonResponse';

// import cloudinary
import cloudinaryConfig from '../config/cloudinary.config';



const gifController = {
    async postGif(req, res) {
        //  gif key (gif) form-data
        let image = req.files.gif;
        const gifTitle = req.body;
        const gifAuthorId = req.id;

        try {
                // empty body values (form-data)
                if (!image || !gifTitle || !gifAuthorId) {
                    return jsonResponse(res, 'error', 400, 'all fields are required');
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
                        return jsonResponse(res, 'success', 201, {
                            gifId: gifQuery.rows[0].gifid,
                            message: 'gif image successfully posted',
                            createdOn: gifQuery.rows[0].createdon,
                            title: gifQuery.rows[0].title,
                            imageUrl: gifQuery.rows[0].image
                        });
                    })
                    .catch((e) =>
                        console.log(e)
                    )
        }
        catch (e) {
            console.log(e);
        };
    },
    async deleteGif(req, res) {
        // parameter (number)
        const id = parseInt(req.params.id);
        
        try {
                // delete gif query
                const deleteGif = `DELETE FROM gifs WHERE gifId=$1`;
                const value = [id];
                const deleteGifQuery = await pool.query(deleteGif, value);

                // delete gif response
                return jsonResponse(res, 'success', 200, 'gif post successfully deleted');
        }
        catch (e) {
            console.log(e)
        };
    }
}

// export gif controller routes
export default gifController;