import cloudinary from 'cloudinary';
import pool from '../models/database';
import jsonResponse from '../helpers/jsonResponse';

// import cloudinary
import cloudinaryConfig from '../config/cloudinary.config';

// query container
let sendQuery,
    data;

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
                        sendQuery = await pool.query(`INSERT INTO gifs (image, gifTitle, gifAuthorId , gifCreatedOn)
                        VALUES($1, $2, $3, $4) RETURNING *`, [result.url, gifTitle, gifAuthorId, new Date().toLocaleString()]);

                        data = sendQuery.rows[0];
                        // post gif response 
                        return jsonResponse(res, 'success', 201, {
                            gifId: data.gifid,
                            message: 'gif image successfully posted',
                            createdOn: data.createdon,
                            title: data.title,
                            imageUrl: data.image
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
                sendQuery = await pool.query(`DELETE FROM gifs WHERE gifId=$1`, [id]);

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